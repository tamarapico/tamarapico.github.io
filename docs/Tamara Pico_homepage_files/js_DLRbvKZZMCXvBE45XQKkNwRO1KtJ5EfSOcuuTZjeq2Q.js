(function ($) {

$(document).ready(function() {

  // Expression to check for absolute internal links.
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");

  // Attach onclick event to document only and catch clicks on all elements.
  $(document.body).click(function(event) {
    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {
      // Fetches settings.
      var os_ga = Drupal.settings.os_ga;
      // Checks for download links (including query string)
      var isDownload = new RegExp("\\.(" + os_ga.trackDownloadExtensions + ")(\\?.*)?$", "i");

      // Is the clicked URL internal?
      if (isInternal.test(this.href)) {
        // Is download tracking activated and the file extension configured for
    // download tracking?
        if (os_ga.trackDownload && isDownload.test(this.href)) {
          // Download link clicked.
          var extension = isDownload.exec(this.href);
          _gaq.push(["_trackEvent", "Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, '')]);
        }
      }
      else {
        if (os_ga.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          _gaq.push(["_trackEvent", "Mails", "Click", this.href.substring(7)]);
        }
        else if (os_ga.trackOutbound && this.href.match(/^\w+:\/\//i)) {
        // External link clicked.
        _gaq.push(["_trackEvent", "Outbound links", "Click", this.href]);
        }
      }
      // Is this link in a main menu?
      if (os_ga.trackNavigation) {
      if ($(this).closest('#block-os-secondary-menu').length) {
        var navType = "Secondary Nav";
        }
        if ($(this).closest('#block-os-primary-menu').length) {
          var navType = "Primary Nav";
        }
        if (navType) {
          _gaq.push(["_trackEvent", navType, "Click", this.href]);
        }
      }
    });
  });
});

})(jQuery);
;

/**
 * @file: Popup dialog interfaces for the media project.
 *
 * Drupal.media.popups.mediaBrowser
 *   Launches the media browser which allows users to pick a piece of media.
 *
 * Drupal.media.popups.mediaStyleSelector
 *  Launches the style selection form where the user can choose
 *  what format / style they want their media in.
 *
 */

(function ($) {
namespace('Drupal.media.popups');

/**
 * Media browser popup. Creates a media browser dialog.
 *
 * @param {function}
 *          onSelect Callback for when dialog is closed, received (Array
 *          media, Object extra);
 * @param {Object}
 *          globalOptions Global options that will get passed upon initialization of the browser.
 *          @see Drupal.media.popups.mediaBrowser.getDefaults();
 *
 * @param {Object}
 *          pluginOptions Options for specific plugins. These are passed
 *          to the plugin upon initialization.  If a function is passed here as
 *          a callback, it is obviously not passed, but is accessible to the plugin
 *          in Drupal.settings.variables.
 *
 *          Example
 *          pluginOptions = {library: {url_include_patterns:'/foo/bar'}};
 *
 * @param {Object}
 *          widgetOptions Options controlling the appearance and behavior of the
 *          modal dialog.
 *          @see Drupal.media.popups.mediaBrowser.getDefaults();
 */
Drupal.media.popups.mediaBrowser = function (onSelect, globalOptions, pluginOptions, widgetOptions) {
  var options = Drupal.media.popups.mediaBrowser.getDefaults();
  options.global = $.extend({}, options.global, globalOptions);
  options.plugins = pluginOptions;
  options.widget = $.extend({}, options.widget, widgetOptions);

  // Create it as a modal window.
  var browserSrc = options.widget.src;
  if ($.isArray(browserSrc) && browserSrc.length) {
    browserSrc = browserSrc[browserSrc.length - 1];
  }
  // Params to send along to the iframe.  WIP.
  var params = {};
  $.extend(params, options.global);
  params.plugins = options.plugins;

  browserSrc += '&' + $.param(params);
  var mediaIframe = Drupal.media.popups.getPopupIframe(browserSrc, 'mediaBrowser');
  // Attach the onLoad event
  mediaIframe.bind('load', options, options.widget.onLoad);
  /**
   * Setting up the modal dialog
   */

  var ok = 'OK';
  var cancel = 'Cancel';
  var notSelected = 'You have not selected anything!';

  if (Drupal && Drupal.t) {
    ok = Drupal.t(ok);
    cancel = Drupal.t(cancel);
    notSelected = Drupal.t(notSelected);
  }

  // @todo: let some options come through here. Currently can't be changed.
  var dialogOptions = options.dialog;

  dialogOptions.buttons[ok] = function () {
    var selected = this.contentWindow.Drupal.media.browser.selectedMedia;
    if (selected.length < 1) {
      alert(notSelected);
      return;
    }
    onSelect(selected);
    $(this).dialog("destroy");
    $(this).remove();
  };

  dialogOptions.buttons[cancel] = function () {
    $(this).dialog("destroy");
    $(this).remove();
  };

  Drupal.media.popups.setDialogPadding(mediaIframe.dialog(dialogOptions));
  // Remove the title bar.
  mediaIframe.parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
  Drupal.media.popups.overlayDisplace(mediaIframe.parents(".ui-dialog"));
  return mediaIframe;
};

Drupal.media.popups.mediaBrowser.mediaBrowserOnLoad = function (e) {
  var options = e.data;
  if (this.contentWindow.Drupal.media.browser == undefined) return;

  if (this.contentWindow.Drupal.media.browser.selectedMedia.length > 0) {
    var ok = (Drupal && Drupal.t) ? Drupal.t('OK') : 'OK';
    var ok_func = $(this).dialog('option', 'buttons')[ok];
    ok_func.call(this);
    return;
  }
};

Drupal.media.popups.mediaBrowser.getDefaults = function () {
  return {
    global: {
      types: [], // Types to allow, defaults to all.
      activePlugins: [] // If provided, a list of plugins which should be enabled.
    },
    widget: { // Settings for the actual iFrame which is launched.
      src: Drupal.settings.media.browserUrl, // Src of the media browser (if you want to totally override it)
      onLoad: Drupal.media.popups.mediaBrowser.mediaBrowserOnLoad // Onload function when iFrame loads.
    },
    dialog: Drupal.media.popups.getDialogOptions()
  };
};

Drupal.media.popups.mediaBrowser.finalizeSelection = function () {
  var selected = this.contentWindow.Drupal.media.browser.selectedMedia;
  if (selected.length < 1) {
    alert(notSelected);
    return;
  }
  onSelect(selected);
  $(this).dialog("destroy");
  $(this).remove();
}

/**
 * Style chooser Popup. Creates a dialog for a user to choose a media style.
 *
 * @param mediaFile
 *          The mediaFile you are requesting this formatting form for.
 *          @todo: should this be fid?  That's actually all we need now.
 *
 * @param Function
 *          onSubmit Function to be called when the user chooses a media
 *          style. Takes one parameter (Object formattedMedia).
 *
 * @param Object
 *          options Options for the mediaStyleChooser dialog.
 */
Drupal.media.popups.mediaStyleSelector = function (mediaFile, onSelect, options) {
  var defaults = Drupal.media.popups.mediaStyleSelector.getDefaults();
  // @todo: remove this awful hack :(
  defaults.src = defaults.src.replace('-media_id-', mediaFile.fid);
  options = $.extend({}, defaults, options);
  // Create it as a modal window.
  var mediaIframe = Drupal.media.popups.getPopupIframe(options.src, 'mediaStyleSelector');
  // Attach the onLoad event
  mediaIframe.bind('load', options, options.onLoad);

  /**
   * Set up the button text
   */
  var ok = 'OK';
  var cancel = 'Cancel';
  var notSelected = 'Very sorry, there was an unknown error embedding media.';

  if (Drupal && Drupal.t) {
    ok = Drupal.t(ok);
    cancel = Drupal.t(cancel);
    notSelected = Drupal.t(notSelected);
  }

  // @todo: let some options come through here. Currently can't be changed.
  var dialogOptions = Drupal.media.popups.getDialogOptions();

  dialogOptions.buttons[ok] = function () {

    var formattedMedia = this.contentWindow.Drupal.media.formatForm.getFormattedMedia();
    if (!formattedMedia) {
      alert(notSelected);
      return;
    }
    onSelect(formattedMedia);
    $(this).dialog("destroy");
    $(this).remove();
  };

  dialogOptions.buttons[cancel] = function () {
    $(this).dialog("destroy");
    $(this).remove();
  };

  Drupal.media.popups.setDialogPadding(mediaIframe.dialog(dialogOptions));
  // Remove the title bar.
  mediaIframe.parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
  Drupal.media.popups.overlayDisplace(mediaIframe.parents(".ui-dialog"));
  return mediaIframe;
};

Drupal.media.popups.mediaStyleSelector.mediaBrowserOnLoad = function (e) {
};

Drupal.media.popups.mediaStyleSelector.getDefaults = function () {
  return {
    src: Drupal.settings.media.styleSelectorUrl,
    onLoad: Drupal.media.popups.mediaStyleSelector.mediaBrowserOnLoad
  };
};


/**
 * Style chooser Popup. Creates a dialog for a user to choose a media style.
 *
 * @param mediaFile
 *          The mediaFile you are requesting this formatting form for.
 *          @todo: should this be fid?  That's actually all we need now.
 *
 * @param Function
 *          onSubmit Function to be called when the user chooses a media
 *          style. Takes one parameter (Object formattedMedia).
 *
 * @param Object
 *          options Options for the mediaStyleChooser dialog.
 */
Drupal.media.popups.mediaFieldEditor = function (fid, onSelect, options) {
  var defaults = Drupal.media.popups.mediaFieldEditor.getDefaults();
  // @todo: remove this awful hack :(
  defaults.src = defaults.src.replace('-media_id-', fid);
  options = $.extend({}, defaults, options);
  // Create it as a modal window.
  var mediaIframe = Drupal.media.popups.getPopupIframe(options.src, 'mediaFieldEditor');
  // Attach the onLoad event
  // @TODO - This event is firing too early in IE on Windows 7,
  // - so the height being calculated is too short for the content.
  mediaIframe.bind('load', options, options.onLoad);

  /**
   * Set up the button text
   */
  var ok = 'OK';
  var cancel = 'Cancel';
  var notSelected = 'Very sorry, there was an unknown error embedding media.';

  if (Drupal && Drupal.t) {
    ok = Drupal.t(ok);
    cancel = Drupal.t(cancel);
    notSelected = Drupal.t(notSelected);
  }

  // @todo: let some options come through here. Currently can't be changed.
  var dialogOptions = Drupal.media.popups.getDialogOptions();

  dialogOptions.buttons[ok] = function () {
    alert('hell yeah');
    return "poo";

    var formattedMedia = this.contentWindow.Drupal.media.formatForm.getFormattedMedia();
    if (!formattedMedia) {
      alert(notSelected);
      return;
    }
    onSelect(formattedMedia);
    $(this).dialog("destroy");
    $(this).remove();
  };

  dialogOptions.buttons[cancel] = function () {
    $(this).dialog("destroy");
    $(this).remove();
  };

  Drupal.media.popups.setDialogPadding(mediaIframe.dialog(dialogOptions));
  // Remove the title bar.
  mediaIframe.parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
  Drupal.media.popups.overlayDisplace(mediaIframe.parents(".ui-dialog"));
  return mediaIframe;
};

Drupal.media.popups.mediaFieldEditor.mediaBrowserOnLoad = function (e) {

};

Drupal.media.popups.mediaFieldEditor.getDefaults = function () {
  return {
    // @todo: do this for real
    src: '/media/-media_id-/edit?render=media-popup',
    onLoad: Drupal.media.popups.mediaFieldEditor.mediaBrowserOnLoad
  };
};


/**
 * Generic functions to both the media-browser and style selector
 */

/**
 * Returns the commonly used options for the dialog.
 */
Drupal.media.popups.getDialogOptions = function () {
  return {
    buttons: {},
    dialogClass: 'media-wrapper',
    modal: true,
    draggable: false,
    resizable: false,
    minWidth: 600,
    width: 800,
    height: 550,
    position: 'center',
    overlay: {
      backgroundColor: '#000000',
      opacity: 0.4
    },
    zIndex: 10000,
    close: function (event, ui) {
      $(event.target).remove();
    }
  };
};

/**
 * Created padding on a dialog
 *
 * @param jQuery dialogElement
 *  The element which has .dialog() attached to it.
 */
Drupal.media.popups.setDialogPadding = function (dialogElement) {
  // @TODO: Perhaps remove this hardcoded reference to height.
  // - It's included to make IE on Windows 7 display the dialog without
  //   collapsing. 550 is the height that displays all of the tab panes
  //   within the Add Media overlay. This is either a bug in the jQuery
  //   UI library, a bug in IE on Windows 7 or a bug in the way the
  //   dialog is instantiated. Or a combo of the three.
  //   All browsers except IE on Win7 ignore these defaults and adjust
  //   the height of the iframe correctly to match the content in the panes
  dialogElement.height(dialogElement.dialog('option', 'height'));
  dialogElement.width(dialogElement.dialog('option', 'width'));
};

/**
 * Get an iframe to serve as the dialog's contents. Common to both plugins.
 */
Drupal.media.popups.getPopupIframe = function (src, id, options) {
  var defaults = {width: '800px', scrolling: 'auto'};
  var options = $.extend({}, defaults, options);

  return $('<iframe class="media-modal-frame"/>')
  .attr('src', src)
  .attr('width', options.width)
  .attr('id', id)
  .attr('scrolling', options.scrolling);
};

Drupal.media.popups.overlayDisplace = function (dialog) {
  if (parent.window.Drupal.overlay) {
    var overlayDisplace = parent.window.Drupal.overlay.getDisplacement('top');
    if (dialog.offset().top < overlayDisplace) {
      dialog.css('top', overlayDisplace);
    }
  }
}

})(jQuery);
;

(function ($) {

  /**
   * When the user is on a mobile device we need to disable the super fish menu.
   */
  Drupal.behaviors.RepsponsiveMenu = {
    attach: function (context) {

      // see https://stackoverflow.com/a/13819253/847651.
      var isMobile = {
        Android: function() {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
          return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
      };

      if (isMobile.any()) {
        // On mobile, don't call the menu open functionality.
        $.fn.showSuperfishUl = function() {}
      }
    }
  };

})(jQuery);
;
/*
* jQuery-Simple-Timer
*
* Creates a countdown timer.
*
* Example:
*   $('.timer').startTimer();
*
*/
(function($){

  var timer;

  var Timer = function(targetElement){
    this.targetElement = targetElement;
    return this;
  };

  Timer.start = function(options, targetElement){
    timer = new Timer(targetElement);
    return timer.start(options);
  };

  Timer.prototype.start = function(options) {

    var createSubDivs = function(timerBoxElement){
      var seconds = document.createElement('span');
      seconds.className = 'seconds';

      var minutes = document.createElement('span');
      minutes.className = 'minutes';

      var hours = document.createElement('span');
      hours.className = 'hours';

      var clearDiv = document.createElement('span');
      clearDiv.className = 'clearDiv';

      return timerBoxElement.        
        append(minutes).
        append(seconds).
        append(clearDiv);
    };

    this.targetElement.each(function(_index, timerBox) {
      var timerBoxElement = $(timerBox);
      var cssClassSnapshot = timerBoxElement.attr('class');

      timerBoxElement.on('complete', function() {
        clearInterval(timerBoxElement.intervalId);
      });

      timerBoxElement.on('complete', function() {
        timerBoxElement.onComplete(timerBoxElement);
      });

      timerBoxElement.on('complete', function(){
        timerBoxElement.addClass('timeout');
      });

      timerBoxElement.on('complete', function(){
        if(options && options.loop === true) {
          timer.resetTimer(timerBoxElement, options, cssClassSnapshot);
        }
      });

      createSubDivs(timerBoxElement);
      return this.startCountdown(timerBoxElement, options);
    }.bind(this));
  };

  /**
   * Resets timer and add css class 'loop' to indicate the timer is in a loop.
   * $timerBox {jQuery object} - The timer element
   * options {object} - The options for the timer
   * css - The original css of the element
   */
  Timer.prototype.resetTimer = function($timerBox, options, css) {
    var interval = 0;
    if(options.loopInterval) {
      interval = parseInt(options.loopInterval, 10) * 1000;
    }
    setTimeout(function() {
      $timerBox.trigger('reset');
      $timerBox.attr('class', css + ' loop');
      timer.startCountdown($timerBox, options);
    }, interval);
  }

  Timer.prototype.fetchSecondsLeft = function(element){
    var secondsLeft = element.data('seconds-left');
    var minutesLeft = element.data('minutes-left');

    if(secondsLeft){
      return parseInt(secondsLeft, 10);
    } else if(minutesLeft) {
      return parseFloat(minutesLeft) * 60;
    }else {
      throw 'Missing time data';
    }
  };

  Timer.prototype.startCountdown = function(element, options) {
    options = options || {};

    var intervalId = null;
    var defaultComplete = function(){
      clearInterval(intervalId);
      return this.clearTimer(element);
    }.bind(this);

    element.onComplete = options.onComplete || defaultComplete;

    var secondsLeft = this.fetchSecondsLeft(element);

    var refreshRate = options.refreshRate || 1000;
    var endTime = secondsLeft + this.currentTime();
    var timeLeft = endTime - this.currentTime();

    this.setFinalValue(this.formatTimeLeft(timeLeft), element);

    intervalId = setInterval((function() {
      timeLeft = endTime - this.currentTime();
      this.setFinalValue(this.formatTimeLeft(timeLeft), element);
    }.bind(this)), refreshRate);

    element.intervalId = intervalId;
  };

  Timer.prototype.clearTimer = function(element){
    element.find('.seconds').text('00');
    element.find('.minutes').text('00:');
    element.find('.hours').text('00:');
  };

  Timer.prototype.currentTime = function() {
    return Math.round((new Date()).getTime() / 1000);
  };

  Timer.prototype.formatTimeLeft = function(timeLeft) {

    var lpad = function(n, width) {
      width = width || 2;
      n = n + '';

      var padded = null;

      if (n.length >= width) {
        padded = n;
      } else {
        padded = Array(width - n.length + 1).join(0) + n;
      }

      return padded;
    };

    var hours, minutes, remaining, seconds;
    remaining = new Date(timeLeft * 1000);
    hours = remaining.getUTCHours();
    minutes = remaining.getUTCMinutes();
    seconds = remaining.getUTCSeconds();

    if (+hours === 0 && +minutes === 0 && +seconds === 0) {
      return [];
    } else {
      return [lpad(hours), lpad(minutes), lpad(seconds)];
    }
  };

  Timer.prototype.setFinalValue = function(finalValues, element) {

    if(finalValues.length === 0){
      this.clearTimer(element);
      element.trigger('complete');
      return false;
    }

    element.find('.seconds').text(finalValues.pop());
    element.find('.minutes').text(finalValues.pop() + ':');
    element.find('.hours').text(finalValues.pop() + ':');
  };


  $.fn.startTimer = function(options) {
    Timer.start(options, this);
    return this;
  };
})(jQuery);
;
(function ($) {
  Drupal.behaviors.osSessionTimeout = {
    attach: function (context) {
      Drupal.settings.os.current_timestamp = Math.round(new Date().getTime()/1000);
      if (ChkLocalStorage()) {
        // On page load, saving the localStorage key values, according to these values, other tabs will update their clocks.
        localStorage.setItem('last_hit_timestamp', Drupal.settings.os.current_timestamp);
        localStorage.setItem('session_expire_timestamp', Drupal.settings.os.current_timestamp + parseInt(Drupal.settings.os.session_lifetime));
        localStorage.setItem('warning_display_timestamp', Drupal.settings.os.current_timestamp + parseInt(Drupal.settings.os.session_lifetime) - parseInt(Drupal.settings.os.warning_interval_before_timeout));
      } else {
        $.cookie('last_hit_timestamp', Drupal.settings.os.current_timestamp);
        $.cookie('session_expire_timestamp', Drupal.settings.os.current_timestamp + parseInt(Drupal.settings.os.session_lifetime));
        $.cookie('session_expire_timestamp', Drupal.settings.os.current_timestamp + parseInt(Drupal.settings.os.session_lifetime) - parseInt(Drupal.settings.os.warning_interval_before_timeout));
      }
      // Starting the timer to determine when to display warning message and refresh the the after session timeout.
      // Every 1 sec interval, values of the above variables will be compared so that timing in all tabs are synced +/-3 secs 
      setInterval(checkSessionStatus, 1000);
    }
  }

  // Every 1 sec of interval, this function is called to determine the eligibilty of displaying timeout warning message and redirect user after session timeout.
  function checkSessionStatus() {
    if (ChkLocalStorage()) {
      // Obtaining values from browser local storage.
      last_hit_timestamp = localStorage.getItem('last_hit_timestamp');
      session_expire_timestamp = localStorage.getItem('session_expire_timestamp');
      warning_display_timestamp = localStorage.getItem('warning_display_timestamp');
    } else {
      last_hit_timestamp = $.cookie('last_hit_timestamp');
      session_expire_timestamp = $.cookie('session_expire_timestamp');
      warning_display_timestamp = $.cookie('warning_display_timestamp');
    }
    // Incrementing timestamp counter by 1 sec.
    Drupal.settings.os.current_timestamp++;
    // Checking if current timestamp value meets the criteria to display warning message or not.
    if (Drupal.settings.os.current_timestamp == warning_display_timestamp && !jQuery('#timeout-warning-wrapper').length) {
      displayTimeoutWarning();
    }
    // Hiding the warning message, if any other tabs are opened/refreshed/extend session link clicked on other tabs.
    if (Drupal.settings.os.current_timestamp < warning_display_timestamp && jQuery('#timeout-warning-wrapper').length) {
      // After displaying the warning, if another tab is refreshed, then hiding the warning msg.
      jQuery('#timeout-warning-wrapper').slideUp('slow', function(){jQuery('#timeout-warning-wrapper').remove();});
    }
    // If current timestamp reaches session expire timestamp, triggering ajax callback for session destroy and reloading the page.
    if (Drupal.settings.os.current_timestamp == session_expire_timestamp) {
      expireCurrentSession();
    }
  }

  // Callback to display session timeout warning message.
  function displayTimeoutWarning(){ 
    jQuery.ajax({
      url: Drupal.settings.basePath + 'check_os_session_status',
      type: 'get',
      dataType:'json',
      success: function(jData) {
        if (jData.show_warning == 1) {
          jQuery('#page').prepend('<div id="timeout-warning-wrapper" class="messages warning element-hidden"><div class="message-inner"><div class="message-wrapper">Warning: Your session will expire in <span id="session-timeout-timer" data-seconds-left=' + Drupal.settings.os.warning_interval_before_timeout + '></span> minutes. <a href="javascript:extend_os_session();" class="session-extend-link">Click here to continue your session.</div></div></div>');
          jQuery('#timeout-warning-wrapper').slideDown('slow');
          jQuery('#session-timeout-timer').startTimer();
        }
      }
    });
  }

  // Callback to destroy drupal session via ajax and reloading the current page.
  function expireCurrentSession(){
    jQuery.get(Drupal.settings.basePath + 'os_session_destroy', function(data) {
      location.reload(true);
    });
  }

})(jQuery);

// Ajax callback to regenerate Drupal session and extend session timeout.
function extend_os_session() {
  jQuery.ajax({
    url: Drupal.settings.basePath + 'extend_os_session',
    type: 'get',
    dataType:'json',
    success: function(jData) {
      // Hiding warning message div.
      jQuery('#timeout-warning-wrapper').slideUp('slow', function(){jQuery('#timeout-warning-wrapper').remove();});
      var current_timestamp = Math.round(new Date().getTime()/1000);
      if (ChkLocalStorage()) {
        localStorage.setItem('last_hit_timestamp', current_timestamp);
        localStorage.setItem('session_expire_timestamp', current_timestamp + parseInt(Drupal.settings.os.session_lifetime));
        localStorage.setItem('warning_display_timestamp', current_timestamp + parseInt(Drupal.settings.os.session_lifetime) - parseInt(Drupal.settings.os.warning_interval_before_timeout));
      } else {
        $.cookie('last_hit_timestamp', current_timestamp);
        $.cookie('session_expire_timestamp', current_timestamp + parseInt(Drupal.settings.os.session_lifetime));
        $.cookie('warning_display_timestamp', current_timestamp + parseInt(Drupal.settings.os.session_lifetime) - parseInt(Drupal.settings.os.warning_interval_before_timeout));
      }
    }
  });
}

// Check for localStorage
function ChkLocalStorage() {
  try {
    localStorage.setItem('testLocalStorage', 'test');
    localStorage.removeItem('testLocalStorage');
    return true;
  } catch(e) {
    return false;
  }
};
/**
 * Add a dismiss "X" link to all drupal messages.
 */

(function ($) {

  Drupal.behaviors.dismiss = {
    attach: function(context) {

      // Append the Dismiss button to each message box.
      $('.messages').each(function(){
        $(this).prepend('<a class="dismiss">X</a>');
      });

      // When the Dismiss button is clicked hide this set of messages.
      $('.dismiss').click(function(){
        $(this).parent().hide('fast');
      });

    }
  }

})(jQuery);
;
window.tinyMCEPreInit = {"base":"\/profiles\/openscholar\/libraries\/tinymce\/jscripts\/tiny_mce","suffix":"","query":""};;
/**
 * @file
 * Implement a simple, clickable dropdown menu.
 *
 * See dropdown.theme.inc for primary documentation.
 *
 * The javascript relies on four classes:
 * - The dropdown must be fully contained in a div with the class
 *   ctools-dropdown. It must also contain the class ctools-dropdown-no-js
 *   which will be immediately removed by the javascript; this allows for
 *   graceful degradation.
 * - The trigger that opens the dropdown must be an a tag wit hthe class
 *   ctools-dropdown-link. The href should just be '#' as this will never
 *   be allowed to complete.
 * - The part of the dropdown that will appear when the link is clicked must
 *   be a div with class ctools-dropdown-container.
 * - Finally, ctools-dropdown-hover will be placed on any link that is being
 *   hovered over, so that the browser can restyle the links.
 *
 * This tool isn't meant to replace click-tips or anything, it is specifically
 * meant to work well presenting menus.
 */

(function ($) {
  Drupal.behaviors.CToolsDropdown = {
    attach: function() {
      $('div.ctools-dropdown').once('ctools-dropdown', function() {
        var $dropdown = $(this);
        var open = false;
        var hovering = false;
        var timerID = 0;

        $dropdown.removeClass('ctools-dropdown-no-js');

        var toggle = function(close) {
          // if it's open or we're told to close it, close it.
          if (open || close) {
            // If we're just toggling it, close it immediately.
            if (!close) {
              open = false;
              $("div.ctools-dropdown-container", $dropdown).slideUp(100);
            }
            else {
              // If we were told to close it, wait half a second to make
              // sure that's what the user wanted.
              // Clear any previous timer we were using.
              if (timerID) {
                clearTimeout(timerID);
              }
              timerID = setTimeout(function() {
                if (!hovering) {
                  open = false;
                  $("div.ctools-dropdown-container", $dropdown).slideUp(100);
                }
              }, 500);
            }
          }
          else {
            // open it.
            open = true;
            $("div.ctools-dropdown-container", $dropdown)
              .animate({height: "show", opacity: "show"}, 100);
          }
        }
        $("a.ctools-dropdown-link", $dropdown).click(function() {
          toggle();
          return false;
        });

        $dropdown.hover(
            function() {
              hovering = true;
            }, // hover in
            function() { // hover out
              hovering = false;
              toggle(true);
              return false;
            });
        // @todo -- just use CSS for this noise.
        $("div.ctools-dropdown-container a").hover(
          function() { $(this).addClass('ctools-dropdown-hover'); },
          function() { $(this).removeClass('ctools-dropdown-hover'); }
        );
      });
    }
  }
})(jQuery);
;

(function ($) {

Drupal.behaviors.osBoxesRemove = {
  attach: function (ctx) {
    $('li.link-count-widget-remove a').once('os-boxes-remove').click(function (e) {
      var widget = $(this).closest('.block');
      removeWidget(widget, this.search);
      $.ajax(this.href);
      e.preventDefault();
      e.stopPropagation();
    })
  }
};

var removed_widgets = {},
  template = 'This widget has been removed from this section. You can <a href="os/widget/{module}/{delta}/remove/{region}/{query}">undo this action</a>',
  error_template = 'This widget has been removed from this section. You must visit the <a href="cp/build/layout/{context}">Layout Form</a> to undo this action.';

function removeWidget(widget, query) {
  var id = widget.attr('id'),
      delta = widget.attr('delta'),
      region = findRegion(widget),
      module = widget.attr('module'),
      html = template;

  if (region) {
    html = html.replace('{delta}', delta);
    html = html.replace('{region}', region);
    html = html.replace('{query}', query);
    html = html.replace('{module}', module);

    removed_widgets[id] = widget.children().detach();
    widget.html(html);
    widget.find('a').click(function (e) {
      var widget = $(this).closest('.block');
      undoRemoveWidget(widget);
      $.ajax(this.href);
      e.preventDefault();
      e.stopPropagation();
    });
  }
  else {
    var matches = query.match(/=[^&]*&/);
    var context = matches[0].replace('=', '');
    html = error_template.replace('{context}', context);
    widget.html(html)
  }
}

function undoRemoveWidget(widget) {
  var id = widget.attr('id');

  widget.empty().append(removed_widgets[id]);
}

function findRegion(widget) {
  var region = widget.closest('.region, .nav'),
    classes = region.attr('class').split(' '),
    region_name = '';

  $.each(classes, function(i, v) {
    if (typeof v == 'string' && v.indexOf('region-') > -1) {
      region_name = v.replace('region-', '').replace('-', '_');
      // found what we need, break out
      // break out of the loop
      return false;
    }
  });

  return region_name;
}

})(jQuery);
;

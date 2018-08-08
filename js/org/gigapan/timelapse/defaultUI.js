// @license
// Redistribution and use in source and binary forms ...

/*
 Class for managing the default UI

 Dependencies:
 * org.gigapan.timelapse.Timelapse
 * jQuery (http://jquery.com/)

 Copyright 2013 Carnegie Mellon University. All rights reserved.

 Redistribution and use in source and binary forms, with or without modification, are
 permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice, this list of
 conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright notice, this list
 of conditions and the following disclaimer in the documentation and/or other materials
 provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY CARNEGIE MELLON UNIVERSITY ''AS IS'' AND ANY EXPRESS OR IMPLIED
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CARNEGIE MELLON UNIVERSITY OR
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 The views and conclusions contained in the software and documentation are those of the
 authors and should not be interpreted as representing official policies, either expressed
 or implied, of Carnegie Mellon University.

 Authors:
 Yen-Chia Hsu (legenddolphin@gmail.com)

 VERIFY NAMESPACE

 Create the global symbol "org" if it doesn't exist.  Throw an error if it does exist but is not an object.
 */

"use strict";

// Create the global symbol "org" if it doesn't exist.  Throw an error if it does exist but is not an object.
var org;
if (!org) {
  org = {};
} else {
  if (typeof org != "object") {
    var orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object";
    alert(orgExistsMessage);
    throw new Error(orgExistsMessage);
  }
}

// Repeat the creation and type-checking for the next level
if (!org.gigapan) {
  org.gigapan = {};
} else {
  if (typeof org.gigapan != "object") {
    var orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object";
    alert(orgGigapanExistsMessage);
    throw new Error(orgGigapanExistsMessage);
  }
}

// Repeat the creation and type-checking for the next level
if (!org.gigapan.timelapse) {
  org.gigapan.timelapse = {};
} else {
  if (typeof org.gigapan.timelapse != "object") {
    var orgGigapanTimelapseExistsMessage = "Error: failed to create org.gigapan.timelapse namespace: org.gigapan.timelapse already exists and is not an object";
    alert(orgGigapanTimelapseExistsMessage);
    throw new Error(orgGigapanTimelapseExistsMessage);
  }
}

//
// DEPENDECIES
//
if (!org.gigapan.timelapse.Timelapse) {
  var noTimelapseMsg = "The org.gigapan.timelapse.Timelapse library is required by org.gigapan.timelapse.DefaultUI";
  alert(noTimelapseMsg);
  throw new Error(noTimelapseMsg);
}

//
// CODE
//
(function() {
  var UTIL = org.gigapan.Util;
  org.gigapan.timelapse.DefaultUI = function(timelapse, settings) {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Class variables
    //

    // Objects
    var visualizer = timelapse.getVisualizer();
    var videoset = timelapse.getVideoset();
    var thumbnailTool = timelapse.getThumbnailTool();
    var changeDetectionTool = timelapse.getChangeDetectionTool();
    var panInterval;
    var eventListeners = {};

    // DOM elements
    var timeMachineDivId = timelapse.getTimeMachineDivId();
    var viewerDivId = timelapse.getViewerDivId();
    var $playbackButton = $("#" + viewerDivId + " .playbackButton");
    var $controls = $("#" + viewerDivId + " .controls");
    var $fastSpeed = $("#fastSpeed");
    var $mediumSpeed = $("#mediumSpeed");
    var $slowSpeed = $("#slowSpeed");
    var $timelineSlider = $("#" + viewerDivId + " .timelineSlider");
    var $timelineSelector = $("#" + viewerDivId + " .timelineSelector");
    var $timelineSliderFiller = $("#" + viewerDivId + " .timelineSliderFiller");
    var $timelineSelectorFiller = $("#" + viewerDivId + " .timelineSelectorFiller");
    var $thumbnailVideoSelector = $("#" + viewerDivId + " .thumbnail-type-video");
    var $thumbnailImageSelector = $("#" + viewerDivId + " .thumbnail-type-image");
    var $thumbnailPreviewCopyTextContainer = $("#" + viewerDivId + " .thumbnail-preview-copy-text-container");
    var $thumbnailSwapSelectionDimensions = $("#" + viewerDivId + " .thumbnail-swap-selection-dimensions");
    var $thumbnailSetCurrentTimeForTimeSpinner = $("#" + viewerDivId + " .thumbnail-set-current-time");
    var $thumbnailPreviewContainer = $("#" + viewerDivId + " .thumbnail-preview-container");
    var $thumbnailPreviewLink = $("#" + viewerDivId + " .thumbnail-preview-link");
    var $thumbnailCustomBoundsWidth = $("#" + viewerDivId + " #thumbnail-width");
    var $thumbnailCustomBoundsHeight = $("#" + viewerDivId + " #thumbnail-height");
    var $captureTime = $("#" + viewerDivId + " .captureTime");
    var $startingTimeSpinner = $("#" + viewerDivId + " .startingTimeSpinner");
    var $endingTimeSpinner = $("#" + viewerDivId + " .endingTimeSpinner");
    var $endingTime = $("#" + viewerDivId + " .endingTime");
    var $thumbnailPlaybackRate = $("#" + viewerDivId + " .thumbnail-playback-rate");
    var $thumbnailFps = $("#" + viewerDivId + " .thumbnail-fps");
    var $thumbnailPlaybackRateMenu = $("#" + viewerDivId + " .thumbnail-playback-rate-menu");
    var $thumbnailPreviewCopyTextButtonTooltip = $("#" + viewerDivId + " .thumbnail-preview-copy-text-button-tooltip");
    var $thumbnailPreviewCopyTextButtonTooltipContent = $("#" + viewerDivId + " .thumbnail-preview-copy-text-button-tooltip").find("p");
    var $thumbnailPreviewCopyTextButton = $("#" + viewerDivId + " .thumbnail-preview-copy-text-button");
    var $thumbnailPreviewCopyDataButton = $("#" + viewerDivId + " .thumbnail-preview-copy-data-button");
    var $thumbnailPreviewCopyDownloadButton = $("#" + viewerDivId + " .thumbnail-preview-copy-download-button");
    var $shareViewDialog = $("#" + viewerDivId + " .shareView");
    var $shareViewDialogClose = $("#" + viewerDivId + " .ui-dialog-titlebar-close");
    var $shareUrl = $("#" + viewerDivId + " .shareurl");
    var $shareUrlCopyTextButton = $("#" + viewerDivId + " .shareurl-copy-text-button");
    var $thumbnailDurationSlider = $("#" + viewerDivId + " .thumbnail-duration-slider");
    var $shareAccordion = $("#" + viewerDivId + " .shareView .accordion");
    var $editorCheckboxContainer = $("#" + viewerDivId + " .toolDialog .customCheckboxContainer[data-mode='editor']")
    var $annotatorCheckboxContainer = $("#" + viewerDivId + " .toolDialog .customCheckboxContainer[data-mode='annotator']");
    var $changeDetectionCheckboxContainer = $("#" + viewerDivId + " .toolDialog .customCheckboxContainer[data-mode='change-detection']");
    var $editorCheckbox = $("#" + viewerDivId + " .toolDialog .customCheckbox[value='editor']")
    var $annotatorCheckbox = $("#" + viewerDivId + " .toolDialog .customCheckbox[value='annotator']");
    var $changeDetectionCheckbox = $("#" + viewerDivId + " .toolDialog .customCheckbox[value='change-detection']");
    var $changeDetectionControl = $("#" + viewerDivId + " .toolDialog .changeDetectionControl");

    // Settings
    var useCustomUI = timelapse.useCustomUI();
    var showShareBtn = ( typeof (settings["showShareBtn"]) == "undefined") ? ( useCustomUI ? false : true) : settings["showShareBtn"];
    var showHomeBtn = ( typeof (settings["showHomeBtn"]) == "undefined") ? true : settings["showHomeBtn"];
    var showFullScreenBtn = ( typeof (settings["showFullScreenBtn"]) == "undefined") ? true : settings["showFullScreenBtn"];
    var showMainControls = ( typeof (settings["showMainControls"]) == "undefined") ? true : settings["showMainControls"];
    var showZoomControls = ( typeof (settings["showZoomControls"]) == "undefined") ? true : settings["showZoomControls"];
    var showPanControls = ( typeof (settings["showPanControls"]) == "undefined") ? true : settings["showPanControls"];
    var showEditorOnLoad = ( typeof (settings["showEditorOnLoad"]) == "undefined") ? false : settings["showEditorOnLoad"];
    var showThumbnailTool = ( typeof (settings["showThumbnailTool"]) == "undefined") ? false : settings["showThumbnailTool"];
    var editorEnabled = timelapse.isEditorEnabled();
    var annotatorEnabled = timelapse.isAnnotatorEnabled();
    var changeDetectionEnabled = timelapse.isChangeDetectionEnabled();
    var showChangeDetectionOnLoad = ( typeof (settings["showChangeDetectionOnLoad"]) == "undefined") ? false : settings["showChangeDetectionOnLoad"];
    var socialMediaSettings = settings["socialMedia"] || {};

    // Flags
    var isSafari = UTIL.isSafari();
    var originalIsPaused;
    var useTouchFriendlyUI = timelapse.useTouchFriendlyUI();
    var timePadding = timelapse.getTimePadding();
    var isStartingTimeSpinnerBlurAdded = false;
    var isEndingTimeSpinnerBlurAdded = false;
    var isWebglViewer = UTIL.getViewerType() == "webgl";

    // Parameters
    var mode = "player";
    var translationSpeedConstant = 20;
    var scrollBarWidth = UTIL.getScrollBarWidth();
    var currentStartingIdx;
    var currentEndingIdx;
    var thumbnailDurationInFrames = 1;
    var seekFromDurationSlider = false;
    var maxPlaybackRate = 1;
    var thumbnailBeginTime;
    var thumbnailEndTime;
    var thumbnailPlaybackSpeed;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Private methods
    //

    // Create main UI
    var createMainUI = function() {
      // Create play button
      $playbackButton.button({
        icons: {
          secondary: "ui-icon-custom-play"
        },
        text: false
      }).on("click", function() {
        if ($(this).hasClass("from_help"))
          return;
        timelapse.handlePlayPause();
        if (!timelapse.isPaused())
          UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-play');
        else
          UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-pause');
      });
      if (useTouchFriendlyUI) {
        $playbackButton.addClass("playbackButton-touchFriendly");
      }
      // Create help button
      var helpPlayerCheckbox = $("#" + viewerDivId + " .helpPlayerCheckbox");
      helpPlayerCheckbox.attr("id", timeMachineDivId + "_helpPlayerCheckbox");
      var $helpPlayerLabel = $("#" + viewerDivId + " .helpPlayerLabel");
      $helpPlayerLabel.attr("for", timeMachineDivId + "_helpPlayerCheckbox");
      helpPlayerCheckbox.button({
        icons: {
          primary: useTouchFriendlyUI ? "ui-icon-custom-help" : "ui-icon-help"
        },
        text: true
      }).change(function() {
        if (helpPlayerCheckbox.is(":checked")) {
          doHelpOverlay();
          $(document).one("mouseup", function(e) {
            if ($helpPlayerLabel.has(e.target).length == 0)
              helpPlayerCheckbox.prop("checked", false).button("refresh").change();
          });
          UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-show-help');
        } else {
          removeHelpOverlay();
        }
      });
      // Create Full Screen button
      if (showFullScreenBtn) {
        $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function() {
          timelapse.changeFullScreenState();
          var $fullScreenPlayer = $("#" + viewerDivId + " .fullScreen");
          if (timelapse.isFullScreen()) {
            // Safari 5 and older webkit browsers causes the screen to be white and not show the video once we enter
            // full screen mode. So we do a hack and seek 10% further into the video to make the browser repaint the canvas.
            // Sadly, this needs to be done on a timer...
            if (document.webkitCancelFullScreen && !document.webkitExitFullscreen) {
              setTimeout(function() {
                timelapse.seek(timelapse.getCurrentTime() + ((1 / timelapse.getFps()) * 0.1));
              }, 500);
            }
            $fullScreenPlayer.button({
              icons: {
                primary: "ui-icon-custom-fullScreenOff"
              }
            });
          } else {
            $fullScreenPlayer.button({
              icons: {
                primary: "ui-icon-custom-fullScreenOn"
              }
            });
          }
        });
        var $fullScreenPlayer = $("<div class='fullScreen'></div>");
        $fullScreenPlayer.attr({
          "id": timeMachineDivId + "_fullScreen",
          "title": "Toggle fullscreen mode"
        });
        $fullScreenPlayer.button({
          icons: {
            primary: "ui-icon-custom-fullScreenOn"
          },
          text: false
        }).on("click", function() {
          timelapse.fullScreen();
        });
        $fullScreenPlayer.appendTo($controls);
      }
      // Create share button
      createShareButton();
      if (!showShareBtn) {
        $("#" + viewerDivId + " .share").hide();
        $("#" + viewerDivId + " .shareView").hide();
      }
      // Create tool button
      if (editorEnabled || annotatorEnabled || changeDetectionEnabled) {
        createToolButton();
      } else {
        $("#" + viewerDivId + " .tool").remove();
      }
      // Create other UI components
      createTimelineSlider();
      createSpeedControl();
      // Settings
      if (!showMainControls || useCustomUI) {
        $controls.hide();
        $timelineSliderFiller.hide();
      }

    };

    var createToolButton = function() {
      $("#" + viewerDivId + " .tool").button({
        icons: {
          primary: "ui-icon-wrench"
        },
        text: true
      }).click(function() {
        var $toolDialog = $("#" + viewerDivId + " .toolDialog");
        if ($toolDialog.dialog("isOpen")) {
          $toolDialog.dialog("close");
        } else {
          $toolDialog.dialog("open");
        }
      });
      if (!editorEnabled) {
        $editorCheckboxContainer.remove();
      }
      if (!annotatorEnabled) {
        $annotatorCheckboxContainer.remove();
      }
      if (!changeDetectionEnabled) {
        $changeDetectionCheckboxContainer.remove();
      }

      // Tool checkbox
      $("#" + viewerDivId + " .toolDialog .customCheckbox").on("change", function() {
        var $this = $(this);
        var desiredMode = $this.val();
        if($this.is(':checked')) {
          if (desiredMode == "editor") {
            if (mode == "annotator") {
              setMode("editor-annotator");
            } else {
              setMode("editor");
            }
            $changeDetectionCheckbox.prop('checked', false);
            if (typeof changeDetectionTool != "undefined") {
              changeDetectionTool.disable();
              $changeDetectionControl.hide();
            }
            UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-set-to-editor-mode');
          } else if (desiredMode == "annotator") {
            if (mode == "editor") {
              setMode("editor-annotator");
            } else {
              setMode("annotator");
            }
            $changeDetectionCheckbox.prop('checked', false);
            if (typeof changeDetectionTool != "undefined") {
              changeDetectionTool.disable();
              $changeDetectionControl.hide();
            }
          } else if (desiredMode == "change-detection") {
            setMode("player");
            $editorCheckbox.prop('checked', false);
            $annotatorCheckbox.prop('checked', false);
            if (typeof changeDetectionTool != "undefined") {
              changeDetectionTool.enable();
              $changeDetectionControl.show();
            }
            UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-set-to-player-mode');
          }
        } else {
          if (desiredMode == "editor" || desiredMode == "annotator") {
            if (mode == "editor-annotator") {
              if (desiredMode == "editor") {
                setMode("annotator");
              } else if (desiredMode == "annotator") {
                setMode("editor");
              }
            } else {
              setMode("player");
              UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-set-to-player-mode');
            }
          } else if (desiredMode == "change-detection") {
            if (typeof changeDetectionTool != "undefined") {
              changeDetectionTool.disable();
              $changeDetectionControl.hide();
            }
          }
        }
      });
      // Initialize
      if (showEditorOnLoad) {
        showChangeDetectionOnLoad = false;
        setMode("editor");
      } else if (showChangeDetectionOnLoad) {
        if (typeof changeDetectionTool != "undefined") {
          changeDetectionTool.enable();
        }
      }
      // Tool dialog
      $("#" + viewerDivId + " .toolDialog").dialog({
        resizable: false,
        autoOpen: false,
        dialogClass: "customDialog",
        appendTo: "#" + viewerDivId,
        width: 444,
        minHeight: 50,
        buttons: {
          "OK": function() {
            $(this).dialog("close");
          }
        }
      });
      // Add events
      $("#" + viewerDivId + " .reset-large-change-detect").click(function(event) {
        changeDetectionTool.centerAndDrawFilterBound("large");
      });
      $("#" + viewerDivId + " .reset-medium-change-detect").click(function(event) {
        changeDetectionTool.centerAndDrawFilterBound("medium");
      });
      $("#" + viewerDivId + " .reset-small-change-detect").click(function(event) {
        changeDetectionTool.centerAndDrawFilterBound("small");
      });
      $("#" + viewerDivId + " .apply-change-detect").click(function(event) {
        changeDetectionTool.filter();
      });
    };

    var removeAccordionPanel = function(panelClass) {
      var $el = $("#" + viewerDivId + " ." + panelClass);
      $el.prev().remove();
      $el.remove();
    };

    var enableShareThumbnail = function() {
      resetShareThumbnailUI();
    };

    var createSizePicker = function() {
      var tmJSON = timelapse.getTmJSON();
      var $sizeSelection = $("<select id=\"sizeSelection\" />");
      $("<option />", {value: 0, text: "Select Quality"}).appendTo($sizeSelection);
      for (var i = 0; i < tmJSON.datasets.length; i++) {
        var $option = $("<option />", {value: i+1, text: tmJSON.datasets[i].name});
        if (i == 0) $option.prop("selected", true);
        $option.appendTo($sizeSelection);
      }
      $sizeSelection.wrap("<div id='sizeSelectionContainer'>").parent().appendTo("#" + viewerDivId);
      $sizeSelection.on("change", function() {
        if ($(this).val() > 0)
          timelapse.switchLayer($(this).val() - 1);
      });
      if ($(".scaleBarContainer").length == 0) {
        $("#sizeSelectionContainer").css("bottom", "90px");
      }
    };
    this.createSizePicker = createSizePicker;

    var createAddressLookupUI = function() {
      if (typeof google === "undefined")
        return;

      var $addressLookupElem = $('<input>').attr({
        size: 35,
        type: "textbox",
        id: "addressLookup",
        "placeholder": "Search for places..."
      });

      $addressLookupElem.wrap("<div id='addressLookupContainer'>").parent().appendTo("#" + viewerDivId);

      $('<div class="search-button"><span class="search-button-icon"></span></div>').appendTo("#addressLookupContainer");

      var autocomplete = new google.maps.places.Autocomplete($addressLookupElem.get(0));
      var geocoder = new google.maps.Geocoder();

      $('#addressLookupContainer .search-button').on("click", function(e) {
        google.maps.event.trigger(autocomplete, 'place_changed');
        return false;
      });

      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place || !place.geometry) {
          var address = $addressLookupElem.val();
          geocoder.geocode({
            'address': address
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var northEastLatLng = results[0].geometry.bounds.getNorthEast();
              var southWestLatLng = results[0].geometry.bounds.getSouthWest();
              var newView;
              if (!northEastLatLng || !southWestLatLng) {
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                newView = {
                  center: {
                    lat: lat,
                    lng: lng
                  },
                  zoom: 10
                };
              } else {
                newView = {
                  bbox: {
                    ne: {
                      lat: northEastLatLng.lat(),
                      lng: northEastLatLng.lng()
                    },
                    sw: {
                      lat: southWestLatLng.lat(),
                      lng: southWestLatLng.lng()
                    }
                  }
                };
              }
              timelapse.setNewView(newView, false, false);
              UTIL.addGoogleAnalyticEvent('textbox', 'search', 'go-to-searched-place');
            } else {
              UTIL.log("Geocode failed: " + status);
            }
          });
        } else {
          var newView = {
            center: {
              "lat": place.geometry.location.lat(),
              "lng": place.geometry.location.lng()
            },
            "zoom": 10
          };
          timelapse.setNewView(newView, false, false);
          UTIL.addGoogleAnalyticEvent('textbox', 'search', 'go-to-searched-place');
        }
      });
    };
    this.createAddressLookupUI = createAddressLookupUI;

    var setShareThumbnailUI = function(starting) {

      if (typeof starting != "undefined") {
        currentStartingIdx = starting;
      }

      currentEndingIdx = currentStartingIdx;

      $startingTimeSpinner.captureTimeSpinner("value", currentStartingIdx);
      $endingTimeSpinner.captureTimeSpinner("value", currentEndingIdx);

      handleThumbnailDurationChange();
    };

    var resetShareThumbnailUI = function() {
      var starting = timelapse.getTimelapseCurrentCaptureTimeIndex();
      setShareThumbnailUI(starting);
    };
    this.resetShareThumbnailUI = resetShareThumbnailUI;

    var showThumbnailToolWindow = function() {
      if (!$("#" + viewerDivId + ' .shareView').is(":visible")) {
        $("#" + viewerDivId + " .share").trigger("click");
      }
    };
    this.showThumbnailToolWindow = showThumbnailToolWindow;

    var disableShareThumbnail = function() {
      thumbnailTool.hideCropBox();
      $timelineSelectorFiller.hide();
    };

    var sliderValueToTime = function(value) {
      return (value + timePadding) / timelapse.getFps();
    };

    var timeToSliderValue = function(time) {
      return time * timelapse.getFps() - timePadding;
    };

    var setThumbnailToolAspectRatio = function() {
      var w = $thumbnailCustomBoundsWidth.val();
      var h = $thumbnailCustomBoundsHeight.val();
      timelapse.getThumbnailTool().forceAspectRatio(w, h);
    };

    var createShareButton = function() {
      $("#" + viewerDivId + " .share").button({
        icons: {
          primary: "ui-icon-person"
        },
        text: true
      }).click(function() {
        $("#" + viewerDivId + ' .shareView').toggle("slide", { direction: "right" }, 1);
        $("#" + viewerDivId + ", #" + viewerDivId + " .shareView").toggleClass("right-panel-active");
        timelapse.onresize();
        if ($("#" + viewerDivId).hasClass("right-panel-active")) {
          updateShareViewTextbox();
          var snaplapse = timelapse.getSnaplapseForPresentationSlider();
          if (snaplapse) {
            var snaplapseViewer = snaplapse.getSnaplapseViewer();
            if (snaplapseViewer.getCurrentWaypointIndex() == -1 || typeof(EARTH_TIMELAPSE_CONFIG) === "undefined") {
              $("#" + viewerDivId + " .presentation-mode-share-input").hide();
            } else  {
              $("#" + viewerDivId + " .presentation-mode-share-input").show();
            }
          }
          UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-show-share-dialog');
          var activeIdx = $shareAccordion.accordion("option", "active");
          var $activePanel = $($shareAccordion.accordion("instance").panels[activeIdx]);
          if ($activePanel.hasClass("share-thumbnail")) {
            setThumbnailToolAspectRatio();
            timelapse.getThumbnailTool().showCropBox();
          }
        } else {
          disableShareThumbnail();
          $("#" + timeMachineDivId + " .shareView .waypoint-index, #" + timeMachineDivId + " .shareView .waypoint-only").prop("checked", false);
        }
      });
      $shareViewDialogClose.on("click", function() {
        $("#" + viewerDivId + " .share").trigger("click");
      });
      $shareViewDialog.addClass("customDialog");
      $shareUrl.focus(function() {
        $(this).select();
      }).click(function() {
        $(this).select();
      }).mouseup(function(e) {
        e.preventDefault();
      });
      $shareUrlCopyTextButton.button().click(function(event) {
        $shareUrl.select();
        document.execCommand('copy');
        setButtonTooltip("Copied", $shareUrlCopyTextButton);
      }).hover(function() {
        setButtonTooltip("Copy to clipboard", $shareUrlCopyTextButton);
      }, function() {
        setButtonTooltip("", $shareUrlCopyTextButton);
      });
      // Share view accordion
      if (!showThumbnailTool) {
        removeAccordionPanel("share-thumbnail");
      }
      $shareAccordion.accordion({
        heightStyle: "content",
        animate: false,
        beforeActivate: function(event, ui) {
          if (ui.oldPanel.hasClass("share-thumbnail")) {
            disableShareThumbnail();
          }
          if (ui.newPanel.hasClass("share-thumbnail")) {
            enableShareThumbnail();
            setThumbnailToolAspectRatio();
            timelapse.getThumbnailTool().showCropBox();
          }
        }
      });
      // Create spinners
      $.widget("ui.captureTimeSpinner", $.ui.spinner, {
        options: {
          step: 1,
          page: 5,
          min: 0,
          currentIndex: 0,
          max: timelapse.getCaptureTimes().length - 1
        },
        _parse: function(value) {
          var captureTimes = timelapse.getCaptureTimes();
          if (typeof value === "string") {
            var dateObj = new Date(value.replace(/-/g, "/"));
            var newIndex = -1;
            var minTime = new Date(captureTimes[0].replace(/-/g, "/")).getTime();
            var maxTime = new Date(captureTimes[captureTimes.length - 1].replace(/-/g, "/")).getTime();
            var dateObjTime = dateObj.getTime();
            if (dateObj != "Invalid Date" && dateObjTime >= minTime && dateObjTime <= maxTime) {
              newIndex = captureTimes.indexOf(value);
              if (newIndex == -1) {
                newIndex = timelapse.findExactOrClosestCaptureTime(value);
                if (newIndex < this.options.min) {
                  newIndex = this.options.min;
                } else if (newIndex > this.options.max) {
                  newIndex = this.options.max;
                }
              }
            }
            if (newIndex != -1) {
              this.options.currentIndex = newIndex;
              return newIndex;
            } else {
              return this.options.currentIndex;
            }
          }
          return value;
        },
        _format: function(value) {
          var format = timelapse.getCaptureTimes()[value];
          return format;
        }
      });
      $startingTimeSpinner.captureTimeSpinner({
        change: function(event, ui) {
          var endingVal = $endingTimeSpinner.captureTimeSpinner("value");
          var startingVal = $startingTimeSpinner.captureTimeSpinner("value");
          if (startingVal > endingVal) {
            $endingTimeSpinner.captureTimeSpinner("value", startingVal);
          }
        },
        spin: function(event, ui) {
          timelapse.seekToFrame(ui.value);
        }
      }).on("mousedown", function(event) {
        // Update the text field after a user input event
        if (isStartingTimeSpinnerBlurAdded == false) {
          isStartingTimeSpinnerBlurAdded = true;
          currentStartingIdx = timelapse.getCaptureTimes().indexOf(event.target.value);
          $startingTimeSpinner.one("blur", function() {
            isStartingTimeSpinnerBlurAdded = false;
            var closestStartingIdx = timelapse.findExactOrClosestCaptureTime(String(event.target.value));
            var minStartSpinnerIdx = 0;
            var maxStartSpinnerIdx = $startingTimeSpinner.captureTimeSpinner("option", "max");
            if (closestStartingIdx == minStartSpinnerIdx || closestStartingIdx == maxStartSpinnerIdx) {
              var captureTimes = timelapse.getCaptureTimes();
              var dateObj = new Date(event.target.value.replace(/-/g, "/"));
              var minTime = new Date(captureTimes[0].replace(/-/g, "/")).getTime();
              var maxTime = new Date(captureTimes[maxStartSpinnerIdx].replace(/-/g, "/")).getTime();
              var dateObjTime = dateObj.getTime();
              if (dateObj == "Invalid Date") {
                closestStartingIdx = -1;
              } else if (dateObjTime > maxTime) {
                closestStartingIdx = maxStartSpinnerIdx;
              } else if (dateObjTime < minTime) {
                closestStartingIdx = minStartSpinnerIdx;
              }
            }
            if (closestStartingIdx != -1) {
              event.target.value = timelapse.getCaptureTimes()[closestStartingIdx];
              timelapse.seekToFrame(closestStartingIdx);
              $startingTimeSpinner.trigger("blur");
            } else if (timelapse.getCaptureTimes().indexOf(event.target.value) == -1) {
              event.target.value = timelapse.getCaptureTimes()[currentStartingIdx];
              timelapse.seekToFrame(currentStartingIdx);
            }
            handleThumbnailDurationChange();
          });
        }
      });
      $startingTimeSpinner.parent().on("mouseleave", function() {
        handleThumbnailDurationChange();
      });
      $endingTimeSpinner.captureTimeSpinner({
        change: function(event, ui) {
          var endingVal = $endingTimeSpinner.captureTimeSpinner("value");
          var startingVal = $startingTimeSpinner.captureTimeSpinner("value");
          if (endingVal < startingVal) {
            $startingTimeSpinner.captureTimeSpinner("value", endingVal);
          }
        },
        spin: function(event, ui) {
          timelapse.seekToFrame(ui.value);
        }
      }).on("mousedown", function(event) {
        // Update the text field after an user input event
        if (isEndingTimeSpinnerBlurAdded == false) {
          isEndingTimeSpinnerBlurAdded = true;
          currentEndingIdx = timelapse.getCaptureTimes().indexOf(event.target.value);
          $endingTimeSpinner.one("blur", function() {
            isEndingTimeSpinnerBlurAdded = false;
            var closestEndingIdx = timelapse.findExactOrClosestCaptureTime(String(event.target.value));
            var minEndSpinnerIdx = 0;
            var maxEndSpinnerIdx = $endingTimeSpinner.captureTimeSpinner("option", "max");
            if (closestEndingIdx == minEndSpinnerIdx || closestEndingIdx == maxEndSpinnerIdx) {
              var captureTimes = timelapse.getCaptureTimes();
              var dateObj = new Date(event.target.value.replace(/-/g, "/"));
              var minTime = new Date(captureTimes[0].replace(/-/g, "/")).getTime();
              var maxTime = new Date(captureTimes[maxEndSpinnerIdx].replace(/-/g, "/")).getTime();
              var dateObjTime = dateObj.getTime();
              if (dateObj == "Invalid Date") {
                closestEndingIdx = -1;
              } else if (dateObjTime > maxTime) {
                closestEndingIdx = maxEndSpinnerIdx;
              } else if (dateObjTime < minTime) {
                closestEndingIdx = minEndSpinnerIdx;
              }
            }
            if (closestEndingIdx != -1) {
              event.target.value = timelapse.getCaptureTimes()[closestEndingIdx];
              timelapse.seekToFrame(closestEndingIdx);
              $endingTimeSpinner.trigger("blur");
            } else if (timelapse.getCaptureTimes().indexOf(event.target.value) == -1) {
              event.target.value = timelapse.getCaptureTimes()[currentEndingIdx];
              timelapse.seekToFrame(currentEndingIdx);
            }
            handleThumbnailDurationChange();
          });
        }
      });
      $endingTimeSpinner.parent().on("mouseleave", function() {
        handleThumbnailDurationChange();
      });

      $thumbnailSetCurrentTimeForTimeSpinner.on("click", function() {
        setButtonTooltip("", $(this));
        if ($(this).hasClass("thumbnail-set-start-time-from-timeline")) {
          $startingTimeSpinner.captureTimeSpinner("value", timelapse.getCurrentFrameNumber());
        } else if ($(this).hasClass("thumbnail-set-end-time-from-timeline")) {
          $endingTimeSpinner.captureTimeSpinner("value", timelapse.getCurrentFrameNumber());
        }
      });

      timelapse.addTimelineUIChangeListener(function() {
        resetShareThumbnailUI();
      });

      // Create dropdown menu
      $thumbnailPlaybackRate.button({
        icons: {
          secondary: "ui-icon-triangle-1-s"
        },
        text: true
      }).click(function() {
        if ($thumbnailPlaybackRateMenu.is(":visible")) {
          $thumbnailPlaybackRateMenu.hide();
        } else {
          $thumbnailPlaybackRateMenu.show().position({
            my: "left top",
            at: "left bottom",
            of: $(this)
          });
          $(document).one("mouseup", function(e) {
            var targetGroup = $(e.target).parents().addBack();
            if (!targetGroup.is(".thumbnail-playback-rate"))
              $thumbnailPlaybackRateMenu.hide();
          });
        }
      });
      $thumbnailPlaybackRateMenu.menu();
      $thumbnailPlaybackRateMenu.find("li").click(function() {
        $thumbnailPlaybackRate.find("span").first().text($(this).data("title"));
        $thumbnailPlaybackRate.data("rate", $(this).data("rate"));
        if ($thumbnailPlaybackRate.find("span").text() == "Custom" && $(".custom-thumbnail-playback-rate").length) return;
        if ($(this).data("rate") == 0 && $(".custom-thumbnail-playback-rate").length == 0){
          $('.thumbnail-playback-rate').after('<input class="custom-thumbnail-playback-rate" type="number" min="0.1" max="10" step=".1"/>');
        } else{
          $('.custom-thumbnail-playback-rate').remove();
        }
      });

      // Hide preview areas
      $thumbnailPreviewContainer.hide();
      $thumbnailPreviewCopyTextContainer.hide();
      // Add events
      $("#" + viewerDivId + " .generate-thumbnail").button().click(function(event) {
        $(this).button("disable");
        $(".thumbnail-preview-container").addClass("loading");
        handleThumbnailDurationChange();
        //$thumbnailPreviewCopyTextButton.button("disable");
        $thumbnailPreviewCopyDataButton.button("disable");
        $thumbnailPreviewCopyDownloadButton.button("disable");

        $(".social-media").empty();

        var urlSettings;
        var format;

        if ($thumbnailVideoSelector.hasClass('selected')) {
          format = "mp4"
        } else if ($thumbnailImageSelector.hasClass('selected')) {
          // Note: This means no single year gif of flows is currently supported
          if (thumbnailDurationInFrames == 1) {
            format = "png";
          } else {
            format = "gif";
          }
        }

        var captureTimes = timelapse.getCaptureTimes();
        var startCaptureTime = captureTimes[$startingTimeSpinner.captureTimeSpinner("value")];
        var endCaptureTime = captureTimes[$endingTimeSpinner.captureTimeSpinner("value")];

        if (captureTimes[0].match(/PM|AM/)) {
          var startEpochTime = timelapse.sanitizedParseTimeGMT(startCaptureTime);
          var startTimeDate = new Date(startEpochTime);
          startCaptureTime = startTimeDate.getFullYear() + "-" + ("0" + (startTimeDate.getMonth() + 1)).slice(-2) + "-" + (("0" + startTimeDate.getDate()).slice(-2)) + " " + ("0" + startTimeDate.getHours()).slice(-2) + ":" + ("0" + startTimeDate.getMinutes()).slice(-2) + ":" + ("0" + startTimeDate.getSeconds()).slice(-2);

          var endEpochTime = timelapse.sanitizedParseTimeGMT(endCaptureTime);
          var endTimeDate = new Date(endEpochTime);
          endCaptureTime = endTimeDate.getFullYear() + "-" + ("0" + (endTimeDate.getMonth() + 1)).slice(-2) + "-" + (("0" + endTimeDate.getDate()).slice(-2)) + " " + ("0" + endTimeDate.getHours()).slice(-2) + ":" + ("0" + endTimeDate.getMinutes()).slice(-2) + ":" + ("0" + endTimeDate.getSeconds()).slice(-2);
        }
        var startCaptureTimeArray = startCaptureTime.replace("UTC", "").replace(/[ T:]/g, "-").replace(".00Z", "").split("-");
        var endCaptureTimeArray = endCaptureTime.replace("UTC", "").replace(/[ T:]/g, "-").replace(".00Z", "").split("-");

        var startYear = parseInt(startCaptureTimeArray[0]);
        var startMonth = parseInt(startCaptureTimeArray[1]) || 1;
        var startDay = parseInt(startCaptureTimeArray[2]) || 1;
        var startHour = parseInt(startCaptureTimeArray[3]) || 0;
        var startMinute = parseInt(startCaptureTimeArray[4]) || 0;
        var startSecond = parseInt(startCaptureTimeArray[5]) || 0;

        var endYear = parseInt(endCaptureTimeArray[0]);
        var endMonth = parseInt(endCaptureTimeArray[1]) || 12;
        var endDay = parseInt(endCaptureTimeArray[2]) || 31;
        var endHour = parseInt(endCaptureTimeArray[3]) || 0;
        var endMinute = parseInt(endCaptureTimeArray[4]) || 0;
        var endSecond = parseInt(endCaptureTimeArray[5]) || 0;

        var initialISOStringLength = 19;
        if (startHour == 0 && startMinute == 0 && startSecond == 0 && endHour == 0 && endMinute == 0 && endSecond == 0) {
          initialISOStringLength = 10;
        }

        thumbnailBeginTime = new Date(Date.UTC(startYear, (startMonth - 1), startDay, startHour, startMinute, startSecond)).toISOString().substr(0, initialISOStringLength).replace(/[-T:]/g, "");
        thumbnailEndTime = new Date(Date.UTC(endYear, (endMonth - 1), endDay, endHour, endMinute, endSecond)).toISOString().substr(0, initialISOStringLength).replace(/[-T:]/g, "");
        thumbnailPlaybackSpeed = (parseFloat($("#" + viewerDivId + " .custom-thumbnail-playback-rate").val()) * 100) || ($thumbnailPlaybackRate.data("rate") * 100);

        var desiredFps;
        if (isWebglViewer) {
          desiredFps = $("#" + viewerDivId + " .thumbnail-fps").val();
        } else {
          desiredFps = Math.max(1, ($("#" + viewerDivId + " .custom-thumbnail-playback-rate").val() || (Math.max(1, timelapse.getMaxPlaybackRate()) * $thumbnailPlaybackRate.data("rate"))) * timelapse.getFps());
        }
        // For browser compatibility, we force a max of 16fps when making gifs.
        // Info from 2012 says that Safari and IE begin to skip frames when playing faster than this.
        if (format == "gif") {
          desiredFps = Math.min(16, desiredFps);
        }

        urlSettings = {
          startFrame: $startingTimeSpinner.captureTimeSpinner("value"),
          ps: thumbnailPlaybackSpeed,
          bt: thumbnailBeginTime,
          et: thumbnailEndTime,
          fps: desiredFps,
          embedTime: $("#" + viewerDivId + " .embed-capture-time").prop('checked'),
          smoothPlayback: $("#" + viewerDivId + " .smooth-playback").prop('checked'),
          startDwell: $("#" + viewerDivId + " .thumbnail-start-delay").val(),
          endDwell: $("#" + viewerDivId + " .thumbnail-end-delay").val(),
          width: $thumbnailCustomBoundsWidth.val(),
          height: $thumbnailCustomBoundsHeight.val(),
          bound: undefined,
          format: format
        };

        if (!isWebglViewer) {
          urlSettings.nframes = thumbnailDurationInFrames;
        }

        var thumbnailParams = thumbnailTool.getURL(urlSettings);

        var listeners = eventListeners["thumbnail-generated-from-ui"];
        if (listeners) {
          for (var i = 0; i < listeners.length; i++) {
            listeners[i]($.extend({}, {url : thumbnailParams.url, timemachineId : timelapse.getTmJSON().id, beginTime : thumbnailBeginTime, endTime : thumbnailEndTime}, thumbnailParams.args));
          }
        }

        setThumbnailPreviewArea(thumbnailParams);
      });

      $("#" + timeMachineDivId + " .shareView").on("click", ".waypoint-index, .waypoint-only", function(e) {
        $("#" + timeMachineDivId + " .shareView .waypoint-index, #" + timeMachineDivId + " .shareView .waypoint-only").not($(e.currentTarget)).prop("checked", false);
        updateShareViewTextbox();
      });

      $thumbnailImageSelector.button().on("click", function() {
        $thumbnailVideoSelector.removeClass('selected');
        $(this).addClass('selected');
        $(".thumbnail-fps").prop('disabled', true);
        handleThumbnailDurationChange();
        var buttonText;
        if (thumbnailDurationInFrames == 1) {
          buttonText = "Generate Image";
        } else {
          buttonText = "Generate GIF";
        }
        $(".generate-thumbnail .ui-button-text").text(buttonText);
      });

      $("#thumbnail-fps-overlay").on("mouseover", function() {
        if ($thumbnailFps.prop("disabled")) {
          setButtonTooltip("Video type needs to be selected to use this", $(this));
        }
      }).on("mouseout", function() {
        setButtonTooltip("", $(this));
      });

      $thumbnailVideoSelector.button().on("click", function() {
        if ($(this).hasClass("disabled")) return;
        $thumbnailImageSelector.removeClass('selected');
        $(".thumbnail-fps").prop('disabled', false);
        $(this).addClass('selected');
        handleThumbnailDurationChange();
        $(".generate-thumbnail .ui-button-text").text("Generate Video");
      }).on("mouseover", function() {
        if ($(this).hasClass("disabled")) {
          setButtonTooltip("Duration needs to be longer", $(this));
        }
      }).on("mouseout", function() {
        setButtonTooltip("", $(this));
      });

      $thumbnailCustomBoundsWidth.on("change", function() {
        setThumbnailToolAspectRatio();
        timelapse.getThumbnailTool().redrawCropBox();
      });

      $thumbnailCustomBoundsHeight.on("change", function() {
        setThumbnailToolAspectRatio();
        timelapse.getThumbnailTool().redrawCropBox();
      });

      $thumbnailSwapSelectionDimensions.on("click", function() {
        var w = $thumbnailCustomBoundsWidth.val();
        var h = $thumbnailCustomBoundsHeight.val();
        $thumbnailCustomBoundsWidth.val(h);
        $thumbnailCustomBoundsHeight.val(w);
        setThumbnailToolAspectRatio();
        timelapse.getThumbnailTool().redrawCropBox();
      });

      $thumbnailPreviewCopyTextButton.button().click(function(event) {
        var tempInput = document.createElement("input");
        tempInput.style = "position: absolute; left: -1000px; top: -1000px";
        tempInput.value = $thumbnailPreviewCopyDownloadButton.data("download-url");
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        setButtonTooltip("Copied", $thumbnailPreviewCopyTextButton);
      }).hover(function() {
        setButtonTooltip("Copy to clipboard", $thumbnailPreviewCopyTextButton);
      }, function() {
        setButtonTooltip("", $thumbnailPreviewCopyTextButton);
      });

      $thumbnailPreviewCopyDataButton.button().click(function(event) {
        var element = $thumbnailPreviewContainer.get(0);
        if (document.body.createTextRange) {
          var range = document.body.createTextRange();
          range.moveToElementText(element);
          range.select();
        } else if (window.getSelection) {
          var selection = window.getSelection();
          var range = document.createRange();
          range.selectNodeContents(element);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        document.execCommand('copy');
        setButtonTooltip("Copied", $thumbnailPreviewCopyDataButton);
        window.getSelection().removeAllRanges();
      }).hover(function() {
        setButtonTooltip("Copy to clipboard", $thumbnailPreviewCopyDataButton);
      }, function() {
        setButtonTooltip("", $thumbnailPreviewCopyDataButton);
      });

      $thumbnailPreviewCopyDownloadButton.button().click(function(event) {
        download($(this).data("download-url"), null, null, "export." + $(this).data("download-type"));
        setButtonTooltip("Downloading", $thumbnailPreviewCopyDownloadButton);
      }).hover(function() {
        setButtonTooltip("Download to your computer", $thumbnailPreviewCopyDownloadButton);
      }, function() {
        setButtonTooltip("", $thumbnailPreviewCopyDownloadButton);
      });

      timelapse.addViewEndChangeListener(function() {
        updateShareViewTextbox();
      });

      if (typeof(EARTH_TIMELAPSE_CONFIG) === "undefined") {
        $("#thumbnail-fps-overlay").closest("tr").hide();
      }
      timelapse.addMasterPlaybackRateChangeListener(function() {
        $(".thumbnail-playback-rate-menu .ui-menu-item").each(function() {
          $(this).text($(this).data("title"));
          if ($(this).data('rate')) {
            var playbackRate = parseFloat($(this).data('rate')) * timelapse.getMaxPlaybackRate();
            $(this).text($(this).text() + " (" + playbackRate + "X)");
          }
        });
      });
    };

    var handleThumbnailDurationChange = function() {
      thumbnailDurationInFrames = Math.max(1, $endingTimeSpinner.captureTimeSpinner("value") - $startingTimeSpinner.captureTimeSpinner("value") + 1)

      if (thumbnailDurationInFrames == 1) {
        $thumbnailImageSelector.children().text("Image");

        if ($thumbnailImageSelector.hasClass("selected")) {
          $(".thumbnail-start-delay, .thumbnail-end-delay, .thumbnail-fps").prop('disabled', true);
          $thumbnailPlaybackRate.button("disable");
        } else if ($thumbnailVideoSelector.hasClass("selected")) {
          $(".thumbnail-start-delay, .thumbnail-end-delay").prop('disabled', false);
          $thumbnailPlaybackRate.button("enable");
        }

        if (!isWebglViewer) {
          $(".thumbnail-start-delay, .thumbnail-end-delay, .thumbnail-fps").prop('disabled', true);
          $thumbnailPlaybackRate.button("disable");
          $thumbnailVideoSelector.addClass("disabled");
          if (!$thumbnailImageSelector.hasClass("selected")) {
            $thumbnailImageSelector.trigger("click");
          }
        }
        //$(".smooth-playback").prop("disabled", true);

      } else {
        if (thumbnailDurationInFrames > 1500) {
          $(".thumbnail-processing-time-warning-container").show().find("div").html("A large number of frames were selected, which may take <br> awhile to process. Always check start/end times to ensure <br> the right time range was chosen before you click generate.");
        } else {
          $(".thumbnail-processing-time-warning-container").hide();
        }
        $thumbnailImageSelector.children().text("GIF");
        $(".thumbnail-start-delay, .thumbnail-end-delay").prop('disabled', false);
        $thumbnailPlaybackRate.button("enable");
        if (!isWebglViewer) {
          $thumbnailVideoSelector.removeClass("disabled");
        }
        //$(".smooth-playback").prop("disabled", false);
      }
      if ($thumbnailImageSelector.hasClass("selected")) {
        var buttonText = thumbnailDurationInFrames == 1 ? "Generate Image" : "Generate GIF";
        $(".generate-thumbnail .ui-button-text").text(buttonText);
      }
    };

    var resetcaptureTimeSpinnerRange = function() {
      $startingTimeSpinner.captureTimeSpinner("option", "min", 0);
      $startingTimeSpinner.captureTimeSpinner("option", "max", timelapse.getCaptureTimes().length - 1);
      $endingTimeSpinner.captureTimeSpinner("option", "min", 0);
      $endingTimeSpinner.captureTimeSpinner("option", "max", timelapse.getCaptureTimes().length - 1);
    };
    this.resetcaptureTimeSpinnerRange = resetcaptureTimeSpinnerRange;

    var setButtonTooltip = function(text, $target, duration) {

      if ($target && ($target.hasClass("ui-button") && $target.button("option", "disabled"))) {
        return;
      }

      var targetOffset = $target.offset();
      var tooltipWidth;
      var containerOffset = $("#" + viewerDivId).offset();

      if (text) {
        $thumbnailPreviewCopyTextButtonTooltipContent.text(text);
        $thumbnailPreviewCopyTextButtonTooltip.show();
        tooltipWidth = $thumbnailPreviewCopyTextButtonTooltip.outerWidth();
        $thumbnailPreviewCopyTextButtonTooltip.css({
          left: targetOffset.left - (tooltipWidth / 2 - ($target.outerWidth() / 2)) - containerOffset.left + "px",
          top: targetOffset.top - containerOffset.top - 45 + "px"
        });
      } else {
        $thumbnailPreviewCopyTextButtonTooltip.hide();
      }

      if (duration) {
        clearTimeout($thumbnailPreviewCopyTextButtonTooltipContent.hideTimer);
        $thumbnailPreviewCopyTextButtonTooltipContent.hideTimer = setTimeout(function() {
          $thumbnailPreviewCopyTextButtonTooltip.hide();
        }, duration);
      }

    };

    var setThumbnailPreviewArea = function(response) {
      $(".thumbnail-preview-error").remove();
      $thumbnailPreviewContainer.show();
      $thumbnailPreviewCopyTextContainer.show();

      // Remove old preview
      if ($(".thumbnail-preview").length) {
        $(".thumbnail-preview").remove();
      }

      // Add preview based on type
      var response_is_image = (response.args.format == "jpg" || response.args.format == "png");
      var response_is_gif = response.args.format == "gif";
      var response_is_video = (response.args.format == "mp4" || response.args.format == "webm");

      var $thumbnailPreview;
      if (response_is_image || response_is_gif) {
        $thumbnailPreview = $("<img class='thumbnail-preview' src='" + response.url + "'>");
      } else if (response_is_video) {
        $thumbnailPreview = $("<video class='thumbnail-preview' src='" + response.url + "' controls autoplay muted preload='auto'></video>");
      } else {
        $thumbnailPreview = $("<div class='thumbnail-preview-error'>Sorry, something went wrong. Invalid output format.</div>");
        $thumbnailPreviewContainer.empty().prepend($thumbnailPreview);
        $("#" + viewerDivId + " .generate-thumbnail").button("enable");
        return;
      }
      $thumbnailPreviewContainer.prepend($thumbnailPreview);
      $thumbnailPreview.hide();
      $thumbnailPreviewLink.hide();

      if (typeof (response.args.nframes) === "undefined") {
        response.args.nframes = 1;
      }
      var desiredTime = timelapse.frameNumberToTime(response.args.startFrame);
      var desiredView = response.args.boundsLTRB ? response.args.boundsLTRB + ",pts" : response.args.root.split("/#v")[1];

      var shareViewOptions = {}
      shareViewOptions.bt = thumbnailBeginTime;
      shareViewOptions.et = thumbnailEndTime;
      shareViewOptions.ps = thumbnailPlaybackSpeed;

      var shareView = UTIL.getParentURL() + timelapse.getShareView(desiredTime, desiredView, shareViewOptions);
      $thumbnailPreviewLink.attr("href", UTIL.getParentURL() + timelapse.getShareView(desiredTime, desiredView, shareViewOptions));
      $(".thumbnail-preview-copy-download-button").data('download-url', response.url);
      $(".thumbnail-preview-copy-download-button").data('download-type', response.args.format);
      $thumbnailPreviewLink.text("Explore this view");

      if (response_is_image) {
        $thumbnailPreviewCopyDataButton.children().text("Copy Image");
      } else if (response_is_gif) {
        $thumbnailPreviewCopyDataButton.children().text("Copy GIF");
      } else if (response_is_video) {
        $thumbnailPreviewCopyDataButton.children().text("Copy Video");
      }

      $thumbnailPreview.on("load loadeddata", function() {
        $("#" + viewerDivId + " .generate-thumbnail").button("enable");
        if (response_is_image || response_is_gif) {
          $thumbnailPreviewCopyDataButton.button("enable");
        }
        //$thumbnailPreviewCopyTextButton.button("enable");
        $thumbnailPreviewCopyDownloadButton.button("enable");
        $thumbnailPreview.show();
        $thumbnailPreviewLink.show();
        $(".thumbnail-preview-container").removeClass('loading');

        // Social Media
        if (socialMediaSettings) {
          var socialMediaShareLink;
          var hashTags = [];
          var shareTitle = document.title;
          var shareDescription = " ";
          if (socialMediaSettings.hashTags) {
            hashTags = socialMediaSettings.hashTags;
          }
          if (timelapse.getDatasetType() == "breathecam") {
            if (typeof(locationMap) !== "undefined") {
              shareTitle = locationMap[timelapse.getTmJSON().id];
            }
          }
          hashTags = hashTags.join(",");
          if (response_is_image) {
            socialMediaShareLink = "https://share.createlab.org/image?site=" + encodeURIComponent(shareView) + "&title=" + encodeURIComponent(shareTitle) + "&description=" + encodeURIComponent(shareDescription) + "&site_name=" + encodeURIComponent(document.title) + "&fb_app_id=" + socialMediaSettings.facebookAppId + "&handle=" + encodeURIComponent(socialMediaSettings.twitterHandle) + "&image=" + encodeURIComponent(response.url);
          } else if (response_is_video || response_is_gif) {
            var aspectRatio = $thumbnailCustomBoundsWidth.val() / $thumbnailCustomBoundsHeight.val();
            var previewWidth = 640;
            var previewHeight = Math.round(previewWidth / aspectRatio);
            var previewImage = response.url.replace("format=mp4", "format=png");
            previewImage = previewImage.replace("format=webm", "format=png");
            previewImage = previewImage.replace("width=" + $thumbnailCustomBoundsWidth.val(), "width=" + previewWidth);
            previewImage = previewImage.replace("height=" + $thumbnailCustomBoundsHeight.val(), "height=" + previewHeight);
            previewImage = previewImage.replace("nframes=" + response.args.nframes, "nframes=1");
            previewImage = previewImage.replace("&labelsFromDataset", "&preview");
            // We treat gifs as videos because we make use of the poster attribute in the video tag to get a gif to play on social media, specifically twitter.
            socialMediaShareLink = "https://share.createlab.org/video?site=" + encodeURIComponent(shareView) + "&title=" + encodeURIComponent(shareTitle) + "&description=" + encodeURIComponent(shareDescription) + "&site_name=" + encodeURIComponent(document.title) + "&fb_app_id=" + socialMediaSettings.facebookAppId + "&handle=" + encodeURIComponent(socialMediaSettings.twitterHandle) + "&image=" + encodeURIComponent(previewImage) + "&video=" + encodeURIComponent(response.url);
          }
          $('<td colspan="3"><a class="twitter-sharelink" data-shareurl="" title="Share on Twitter"></a><a class="fb-sharelink" data-shareurl="" title="Share on Facebook"></a></td>').appendTo(".social-media");
          $(".fb-sharelink, .twitter-sharelink").off("click");
          $(".fb-sharelink").on("click", function() {
              var shareurl = $(this).data('shareurl');
              window.open('https://www.facebook.com/sharer.php?s=100&p[url]='+escape(socialMediaShareLink)+'&p[title]='+document.title, '',
              'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
              return false;
          });
          $(".twitter-sharelink").on("click", function() {
              var shareurl = $(this).data('shareurl');
              window.open('https://twitter.com/intent/tweet?url='+escape(socialMediaShareLink)+'&text='+escape("Look at this")+'&hashtags='+escape(hashTags)+'&via='+escape(socialMediaSettings.twitterHandle), '',
              'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
              return false;
          });
        }
      }).on("error", function() {
        $thumbnailPreview = $("<div class='thumbnail-preview-error'>Sorry, something went wrong. Try again after decreasing the time span to a shorter range and/or making sure your other settings are valid.</div>");
        $thumbnailPreviewContainer.empty().prepend($thumbnailPreview);
        $("#" + viewerDivId + " .generate-thumbnail").button("enable");
      });
    };

    var createSideToolBar = function() {
      if (showPanControls)
        createPanControl();
      if (showZoomControls)
        createZoomControl();
    };

    var createPanControl = function() {
      var $pan = $("#" + viewerDivId + " .pan");
      // Create pan left button
      $pan.append('<div class="panLeft"></div>');
      $("#" + viewerDivId + " .panLeft").button({
        icons: {
          primary: "ui-icon-triangle-1-w"
        },
        text: false
      }).position({
        "my": "left center",
        "at": "left center",
        "of": $("#" + viewerDivId + " .panLeft").parent()
      }).on("mousedown", function() {
        panInterval = setInterval(function() {
          var offset = {
            x: -translationSpeedConstant,
            y: 0
          };
          timelapse.setTargetView(undefined, offset);
        }, 50);
        $(document).one("mouseup", function() {
          clearInterval(panInterval);
        });
        UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-pan-left-from-button');
      });
      // Create pan left button
      $pan.append('<div class="panRight"></div>');
      $("#" + viewerDivId + " .panRight").button({
        icons: {
          primary: "ui-icon-triangle-1-e"
        },
        text: false
      }).position({
        "my": "right center",
        "at": "right center",
        "of": $("#" + viewerDivId + " .panLeft").parent()
      }).on("mousedown", function() {
        panInterval = setInterval(function() {
          var offset = {
            x: translationSpeedConstant,
            y: 0
          };
          timelapse.setTargetView(undefined, offset);
        }, 50);
        $(document).one("mouseup", function() {
          clearInterval(panInterval);
        });
        UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-pan-right-from-button');
      });
      // Create pan left button
      $pan.append('<div class="panUp"></div>');
      $("#" + viewerDivId + " .panUp").button({
        icons: {
          primary: "ui-icon-triangle-1-n"
        },
        text: false
      }).position({
        "my": "center top",
        "at": "center top",
        "of": $("#" + viewerDivId + " .panLeft").parent()
      }).on("mousedown", function() {
        panInterval = setInterval(function() {
          var offset = {
            x: 0,
            y: -translationSpeedConstant
          };
          timelapse.setTargetView(undefined, offset);
        }, 50);
        $(document).one("mouseup", function() {
          clearInterval(panInterval);
        });
        UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-pan-up-from-button');
      });
      // Create pan left button
      $pan.append('<div class="panDown"></div>');
      $("#" + viewerDivId + " .panDown").button({
        icons: {
          primary: "ui-icon-triangle-1-s"
        },
        text: false
      }).position({
        "my": "center bottom",
        "at": "center bottom",
        "of": $("#" + viewerDivId + " .panLeft").parent()
      }).on("mousedown", function() {
        panInterval = setInterval(function() {
          var offset = {
            x: 0,
            y: translationSpeedConstant
          };
          timelapse.setTargetView(undefined, offset);
        }, 50);
        $(document).one("mouseup", function() {
          clearInterval(panInterval);
        });
        UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-pan-down-from-button');
      });
    };

    var createZoomControl = function() {
      var intervalId;
      var $zoom = $("#" + viewerDivId + " .zoom");
      // Create zoom in button
      $zoom.append('<button class="zoomin" title="Zoom in"></button>');

      if (useTouchFriendlyUI)
        $zoom.addClass("zoom-touchFriendly");

      $("#" + viewerDivId + " .zoomin").button({
        icons: {
          primary: useTouchFriendlyUI ? "ui-icon-custom-plus" : "ui-icon-plus"
        },
        text: false
      }).mousedown(function() {
        intervalId = setInterval(function() {
          zoomIn();
        }, 50);
        UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-zoom-in-from-button');
      }).click(function() {
        zoomIn();
      }).mouseup(function() {
        clearInterval(intervalId);
      }).mouseout(function() {
        clearInterval(intervalId);
      });
      // Create zoom slider
      createZoomSlider($zoom);
      // Create zoom out button
      $zoom.append('<button class="zoomout" title="Zoom out"></button>');
      $("#" + viewerDivId + " .zoomout").button({
        icons: {
          primary: useTouchFriendlyUI ? "ui-icon-custom-minus" : "ui-icon-minus"
        },
        text: false
      }).mousedown(function() {
        intervalId = setInterval(function() {
          zoomOut();
        }, 50);
        UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-zoom-out-from-button');
      }).click(function() {
        zoomOut();
      }).mouseup(function() {
        clearInterval(intervalId);
      }).mouseout(function() {
        clearInterval(intervalId);
      });
      // Create zoom all button
      if (showHomeBtn) {
        $zoom.append('<button class="zoomall" title="Home"></button>');
        $("#" + viewerDivId + " .zoomall").button({
          icons: {
            primary: useTouchFriendlyUI ? "ui-icon-custom-home" : "ui-icon-home"
          },
          text: false
        }).click(function() {
          timelapse.warpTo(timelapse.getHomeView());
          UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-zoom-to-home-view');
        });
      }
    };

    var createZoomSlider = function($zoom) {
      $zoom.append('<div class="zoomSlider" title="Click to zoom"></div>');
      var $zoomSlider = $("#" + viewerDivId + " .zoomSlider");
      $zoomSlider.slider({
        orientation: "vertical",
        value: timelapse.viewScaleToZoomSlider(timelapse.getHomeView().scale),
        min: 0,
        max: 1,
        step: useTouchFriendlyUI ? 0.003 : 0.01,
        slide: function(e, ui) {
          timelapse.setScaleFromSlider(ui.value);
        }
      }).removeClass("ui-corner-all");

      $zoomSlider.bind("mousedown", function() {
        if (window && (window.self !== window.top)) {
          $("body").one("mouseleave", function(event) {
            $zoomSlider.trigger("mouseup");
          });
        }
        UTIL.addGoogleAnalyticEvent('slider', 'click', 'viewer-zoom-from-slider');
      });

      $("#" + viewerDivId + " .zoomSlider .ui-slider-handle").attr("title", "Drag to zoom");

      if (useTouchFriendlyUI)
        $("#" + viewerDivId + " .pan, .zoomSlider").hide();

    };

    var setPlaybackRate = function(newSpeed) {
      timelapse.setPlaybackRate(newSpeed, null, true);
    };
    this.setPlaybackRate = setPlaybackRate;

    var setMaxPlaybackRate = function(newMaxPlaybackRate) {
      maxPlaybackRate = newMaxPlaybackRate;
    };
    this.setMaxPlaybackRate = setMaxPlaybackRate;

    var getMaxPlaybackRate = function() {
      return maxPlaybackRate;
    };
    this.getMaxPlaybackRate = getMaxPlaybackRate;

    var createSpeedControl = function() {
      var fastRate = getMaxPlaybackRate();
      var mediumRate = getMaxPlaybackRate() / 2;
      var slowRate = getMaxPlaybackRate() / 4;

      // Speeds < 0.5x in Safari, even if emulated, result in broken playback, so do not include the "slow" (0.25x) speed option
      if (isSafari)
        $slowSpeed.remove();

      $fastSpeed.button({
        text: true
      }).click(function() {
        var mediumRate = getMaxPlaybackRate() / 2;
        timelapse.setPlaybackRate(mediumRate, null, true);
        $controls.prepend($mediumSpeed);
        $mediumSpeed.stop(true, true).show();
        $fastSpeed.slideUp(300);
        UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-set-speed-to-medium');
      });

      $mediumSpeed.button({
        text: true
      }).click(function() {
        // Due to playback issues, we are not allowing the "slow" option for Safari users
        if (isSafari) {
          var fastRate = getMaxPlaybackRate();
          timelapse.setPlaybackRate(fastRate, null, true);
          $controls.prepend($fastSpeed);
          $fastSpeed.stop(true, true).show();
          UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-set-speed-to-fast');
        } else {
          var slowRate = getMaxPlaybackRate() / 4;
          timelapse.setPlaybackRate(slowRate, null, true);
          $controls.prepend($slowSpeed);
          $slowSpeed.stop(true, true).show();
          UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-set-speed-to-slow');
        }
        $mediumSpeed.slideUp(300);
      });

      $slowSpeed.button({
        text: true
      }).click(function() {
        var fastRate = getMaxPlaybackRate();
        timelapse.setPlaybackRate(fastRate, null, true);
        $controls.prepend($fastSpeed);
        $fastSpeed.stop(true, true).show();
        $slowSpeed.slideUp(300);
        UTIL.addGoogleAnalyticEvent('button', 'click', 'viewer-set-speed-to-fast');
      });

      timelapse.addPlaybackRateChangeListener(function(rate, skipUpdateUI) {
        var fastRate = getMaxPlaybackRate();
        var mediumRate = getMaxPlaybackRate() / 2;
        var slowRate = getMaxPlaybackRate() / 4;

        if (!skipUpdateUI) {
          var snaplapse = timelapse.getSnaplapse();
          var snaplapseForSharedTour = timelapse.getSnaplapseForSharedTour();
          if ((snaplapse && snaplapse.isPlaying()) || (snaplapseForSharedTour && snaplapseForSharedTour.isPlaying()))
            return;
          $("#" + viewerDivId + " .toggleSpeed").hide();
          if (rate >= fastRate) {
            $fastSpeed.show();
            $mediumSpeed.hide();
            $slowSpeed.hide();
          } else if ((rate < fastRate && rate >= mediumRate) || (isSafari && rate < mediumRate)) {
            $mediumSpeed.show();
            $fastSpeed.hide();
            $slowSpeed.hide();
          } else {
            $slowSpeed.show();
            $mediumSpeed.hide();
            $fastSpeed.hide();
          }
        }
      });

      // Since the call to set the playback rate when first creating the timelapse
      // happens before the UI is setup, we need to run it again below to properly
      // update the UI.
      var playbackRate = timelapse.getPlaybackRate();
      if (playbackRate >= fastRate) {
        $fastSpeed.show();
      } else if (playbackRate < fastRate && playbackRate >= mediumRate) {
        $mediumSpeed.show();
      } else {
        $slowSpeed.show();
      }
    };

    // Change the UI according to different modes
    var setMode = function(newMode) {
      var snaplapse = timelapse.getSnaplapse();
      var annotator = timelapse.getAnnotator();
      var panoVideo, snaplapseViewer;
      if (visualizer)
        panoVideo = visualizer.getPanoVideo();
      if (snaplapse)
        snaplapseViewer = timelapse.getSnaplapse().getSnaplapseViewer();

      if (mode = "editor-annotator") {
        if (newMode == "editor" || newMode == "annotator") {
          $("#" + timeMachineDivId + " .annotator").css("left", "0px");
          $("#" + timeMachineDivId + " .composer").css("right", "0px");
        }
      }

      if (newMode == "player") {
        mode = "player";
        $("#" + timeMachineDivId + " .composer").hide();
        $("#" + timeMachineDivId + " .annotator").hide();
        if (snaplapseViewer)
          snaplapseViewer.hideAnnotationBubble();
        if (panoVideo)
          panoVideo.pause();
        if (annotator)
          annotator.resetToolbar();
      } else if (newMode == "editor") {
        mode = "editor";
        $("#" + timeMachineDivId + " .composer").show();
        $("#" + timeMachineDivId + " .annotator").hide();
        timelapse.seek_panoVideo(videoset.getCurrentTime());
        if (!videoset.isPaused() && panoVideo)
          panoVideo.play();
        timelapse.updateLocationContextUI();
      } else if (newMode == "annotator") {
        mode = "annotator";
        $("#" + timeMachineDivId + " .annotator").show();
        $("#" + timeMachineDivId + " .composer").hide();
      } else if (newMode == "editor-annotator") {
        mode = "editor-annotator";
        $("#" + timeMachineDivId + " .annotator").css("left", "50%").show();
        $("#" + timeMachineDivId + " .composer").css("right", "50%").show();
      }

      if (visualizer)
        visualizer.setMode(mode, false);
    };
    this.setMode = setMode;

    var updateShareViewTextbox = function() {
      var parentUrl = UTIL.getParentURL();
      // EarthTime specific
      var $shareViewWaypointOnlyCheckbox = $("#" + viewerDivId + " .waypoint-only");
      if ($shareViewWaypointOnlyCheckbox.is(":visible") && $shareViewWaypointOnlyCheckbox.prop("checked")) {
        parentUrl = parentUrl.substring(0, parentUrl.indexOf('/stories')) + "/explore";
      }
      $shareUrl.val(parentUrl + timelapse.getShareView());
    };
    this.updateShareViewTextbox = updateShareViewTextbox;

    var doHelpOverlay = function() {
      $("#" + viewerDivId + " .instructions").fadeIn(200);

      if ($playbackButton.hasClass('pause')) {
        timelapse.handlePlayPause();
        $playbackButton.removeClass("pause").addClass("play from_help");
      }
    };

    var removeHelpOverlay = function() {
      $("#" + viewerDivId + " .instructions").fadeOut(200);

      if ($playbackButton.hasClass('from_help')) {
        timelapse.handlePlayPause();
        $playbackButton.addClass("pause").removeClass("play from_help");
      }
    };

    var zoomIn = function() {
      var val = Math.min($("#" + viewerDivId + " .zoomSlider").slider("value") + ( useTouchFriendlyUI ? 0.003 : 0.01), 1);
      timelapse.setScaleFromSlider(val);
    };

    var zoomOut = function() {
      var val = Math.max($("#" + viewerDivId + " .zoomSlider").slider("value") - ( useTouchFriendlyUI ? 0.003 : 0.01), 0);
      timelapse.setScaleFromSlider(val);
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Public methods
    //
    this.addEventListener = function(eventName, listener) {
      if (eventName && listener && typeof(listener) == "function") {
        if (!eventListeners[eventName]) {
          eventListeners[eventName] = [];
        }
        eventListeners[eventName].push(listener);
      }
    };

    this.removeEventListener = function(eventName, listener) {
      if (eventName && eventListeners[eventName] && listener && typeof(listener) == "function") {
        for (var i = 0; i < eventListeners[eventName].length; i++) {
          if (listener == eventListeners[eventName][i]) {
            eventListeners[eventName].splice(i, 1);
            return;
          }
        }
      }
    };

    this.getMode = function() {
      return mode;
    };

    this.isShowMainControls = function() {
      return showMainControls;
    };

    var _toggleMainControls = function() {
      showMainControls = !showMainControls;
      $controls.toggle();
      $timelineSliderFiller.toggle();
    };
    this.toggleMainControls = _toggleMainControls;

    var _toggleZoomControls = function() {
      showZoomControls = !showZoomControls;
      $("#" + viewerDivId + " .zoom").toggle();
    };
    this.toggleZoomControls = _toggleZoomControls;

    var _togglePanControls = function() {
      showPanControls = !showPanControls;
      $("#" + viewerDivId + " .pan").toggle();
    };
    this.togglePanControls = _togglePanControls;

    var seekFromTimeLineSlider = function(oldValue, newValue) {
      if ((oldValue > newValue) && newValue == 0)
        timelapse.seek(0);
      else
        timelapse.seek(sliderValueToTime(newValue));
    };

    var createTimelineSlider = function() {
      var numFrames = timelapse.getNumFrames();
      var captureTimes = timelapse.getCaptureTimes();

      $("#" + viewerDivId + " .currentTime").html(UTIL.formatTime(timelapse.getTimelapseCurrentTimeInSeconds(), true));
      $("#" + viewerDivId + " .totalTime").html(UTIL.formatTime(timelapse.getDuration(), true));
      $("#" + viewerDivId + " .currentCaptureTime").html(UTIL.htmlForTextWithEmbeddedNewlines(captureTimes[timelapse.getTimelapseCurrentCaptureTimeIndex()]));

      // Remove all previously added events
      $timelineSlider.unbind("mousedown");

      $timelineSlider.slider({
        min: 0,
        max: numFrames - 1, // this way the time scrubber goes exactly to the end of timeline
        range: "min",
        step: 1,
        slide: function(e, ui) {
          // $(this).slider('value')  --> previous value
          // ui.value                 --> current value
          timelapse.seekToFrame(ui.value);
        }
      }).removeClass("ui-corner-all").children().removeClass("ui-corner-all");
      $("#" + viewerDivId + " .timelineSlider .ui-slider-handle").attr("title", "Drag to go to a different point in time");

      $timelineSlider.bind("mousedown", function() {
        originalIsPaused = timelapse.isPaused();
        if (!originalIsPaused)
          timelapse.handlePlayPause();
        if (window && (window.self !== window.top)) {
          $("body").one("mouseleave", function(event) {
            $timelineSlider.trigger("mouseup");
          });
        }
        // Make sure we release mousedown upon exiting our viewport if we are inside an iframe
        $("body").one("mouseleave", function(event) {
          if (window && (window.self !== window.top)) {
            if (!originalIsPaused)
              timelapse.handlePlayPause();
          }
        });
        // Release mousedown upon mouseup
        $(document).one("mouseup", function(event) {
          if (!originalIsPaused)
            timelapse.handlePlayPause();
        });
        UTIL.addGoogleAnalyticEvent('slider', 'click', 'viewer-seek');
      });
      if (useTouchFriendlyUI) {
        $captureTime.addClass("captureTime-touchFriendly");
      }
    };
    this.createTimelineSlider = createTimelineSlider;

    var resetTimelineSlider = function() {
      // Recreate timeline slider.
      // There seems to be an issue with the jQuery UI slider widget, since just changing the max value and refreshing
      // the slider does not proplerly update the available range. So we have to manually recreate it...
      var $timeSlider = $("#" + viewerDivId + " .timelineSlider");
      $timeSlider.slider("destroy");
      createTimelineSlider();
      $timeSlider.slider("option", "value", timelapse.getTimelapseCurrentCaptureTimeIndex());

      if (settings["showThumbnailTool"]) {
        resetcaptureTimeSpinnerRange();
        resetShareThumbnailUI();
      }

      // TODO: Double check why sometimes we get the wrong icon for the play button
      if (!timelapse.isPaused() && !timelapse.isDoingLoopingDwell()) {
        $("#" + viewerDivId + " .playbackButton").button({
          icons: {
            primary: "ui-icon-custom-pause"
          },
          text: false
        }).attr({
          "title": "Pause"
        });
      }
    };
    this.resetTimelineSlider = resetTimelineSlider;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Constructor code
    //
    createSideToolBar();
    createMainUI();
    if (!useCustomUI) {
      if (timelapse.getPlayOnLoad())
        timelapse.play();
    } else {// custom UI is being used, alter main UI accordingly
      // Create share button
      if (showShareBtn) {
        //createShareButton();
        //var shareButton = $("#" + viewerDivId + " .share");
        //$controls.children().not(shareButton).hide();
        //shareButton.css("bottom", "110px");
      } else {
        $("#" + viewerDivId + " .controls").hide();
        $("#" + viewerDivId + " .shareView").hide();
      }
      $captureTime.hide();
      $("#" + viewerDivId + " .toolDialog").hide();
    }
    if (useTouchFriendlyUI) {
      $controls.addClass("controls-touchFriendly");
    }
  };
  //end of org.gigapan.timelapse.DefaultUI
})();
//end of (function() {

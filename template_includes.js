// Autogenerated by update_template_includes.rb 2016-02-23 19:01:00 -0500
var cached_ajax=cached_ajax||{};
cached_ajax['templates/browser_not_supported_template.html']="<div id=\"browser_not_supported\">\n  <div class=\"warning\">Sorry, but it looks like your browser is not currently supported by our viewer.\n    <br><br>At this time, we support the desktop versions of\n    <a href=\"http://www.google.com/chrome\">Chrome</a>,\n    <a href=\"http://www.apple.com/safari/\">Safari</a>,\n    <a href=\"http://www.firefox.com\">Firefox</a> and\n    <a href=\"http://windows.microsoft.com/en-us/internet-explorer/download-ie\">Internet Explorer 9+<a>.\n  </div>\n</div>\n";
cached_ajax['templates/player_template.html']="<div class=\"player\">\n  <div class=\"sideToolBar\">\n    <div class=\"pan\" title=\"Click to pan\"></div>\n    <div class=\"zoom\"></div>\n  </div>\n\n  <div class=\"instructions\">\n    <span class=\"zoomhelp\">\n      <p>\n        Zoom in and out to explore in greater detail. Click or use the mouse scroll wheel.\n      </p></span>\n    <span class=\"zoomallhelp\">\n      <p>\n        Click to view the whole scene.\n      </p></span>\n    <span class=\"speedhelp\">\n      <p>\n        Click to toggle playback speed.\n      </p></span>\n    <span class=\"movehelp\">\n      <p>\n        Click and drag to explore.\n      </p></span>\n  </div>\n\n  <div class=\"spinnerOverlay\"></div>\n\n  <div id=\"{REPLACE}\" class=\"tiledContentHolder\"></div>\n\n  <div class=\"captureTime\" title=\"Capture time\">\n    <div class=\"currentCaptureTime\"></div>\n  </div>\n\n  <div class=\"controls\">\n    <div class=\"timelineSliderFiller\">\n      <div id=\"Tslider1\" class=\"timelineSlider\"></div>\n    </div>\n    <div class=\"timelineSelectorFiller\">\n      <div id=\"Tselector1\" class=\"timelineSelector\"></div>\n    </div>\n    <div title=\"Play\" class=\"playbackButton\"></div>\n    <div class=\"videoTime\" title=\"Video time\">\n      <span class=\"currentTime\">00:00.00</span>/<span class=\"totalTime\">00:00.00</span>\n    </div>\n    <input type=\"checkbox\" class=\"helpPlayerCheckbox\"/>\n    <label class=\"helpPlayerLabel\" title=\"Show instructions\">Help</label>\n    <button class=\"toggleSpeed\" id=\"fastSpeed\" title=\"Toggle playback speed\">\n      Fast\n    </button>\n    <button class=\"toggleSpeed\" id=\"mediumSpeed\" title=\"Toggle playback speed\">\n      Medium\n    </button>\n    <button class=\"toggleSpeed\" id=\"slowSpeed\" title=\"Toggle playback speed\">\n      Slow\n    </button>\n    <button class=\"share customButton\" title=\"Share current view\">\n      Share\n    </button>\n    <button class=\"tool customButton\" title=\"Tools\">\n      Tools\n    </button>\n  </div>\n\n  <div class=\"toolDialog\" title=\"Tools\">\n    <div class=\"accordion\" data-mode=\"editor\">\n      <h3>Toggle tour and slideshow editor</h3>\n      <div class=\"accordion-editor\">\n        The tour and slideshow editor enables telling and sharing interesting stories by creating custom guided tours and interactive slideshows, travelling through space and time. For more information, refer to the <a href=\"http://wiki.gigapan.org/creating-time-machines/embedding-time-machine\" target=\"_blank\">tutorial</a>.\n      </div>\n    </div>\n    <div class=\"accordion\" data-mode=\"annotator\">\n      <h3>Toggle annotator</h3>\n      <div class=\"accordion-annotator\">\n        The annotator enables creating customized annotations on the viewer.\n      </div>\n    </div>\n    <div class=\"accordion\" data-mode=\"change-detection\">\n      <h3>Toggle change detection tool</h3>\n      <div class=\"accordion-change-detection\">\n        <a href=\"javascript:void(0)\" class=\"apply-change-detect\">Click here to detect</a> changes in the selected region.\n        <br>\n        Center the box to a <a href=\"javascript:void(0)\" class=\"reset-large-change-detect\">large</a>,&nbsp;<a href=\"javascript:void(0)\" class=\"reset-medium-change-detect\">medium</a>, or&nbsp;<a href=\"javascript:void(0)\" class=\"reset-small-change-detect\">small</a> size\n      </div>\n    </div>\n  </div>\n\n  <span class=\"thumbnail-preview-copy-text-button-tooltip\">\n    <p></p>\n  </span>\n\n  <ul class=\"thumbnail-speed-menu customDropdownMenu\">\n    <li data-speed=\"0.1\">0.1X</li>\n    <li data-speed=\"0.25\">0.25X</li>\n    <li data-speed=\"0.5\">0.5X</li>\n    <li data-speed=\"1\">1X</li>\n    <li data-speed=\"2\">2X</li>\n    <li data-speed=\"4\">4X</li>\n  </ul></td>\n\n  <div class=\"shareView\" title=\"Share a View\">\n    <div class=\"accordion\">\n      <h3>Share link</h3>\n      <div id=\"share-link-container\">\n        <table class=\"share-link\">\n          <tr>\n            <td><input type=\"text\" class=\"shareurl\"></td>\n            <td><div class=\"shareurl-copy-text-button customDialogButton\">Copy</div></td>\n          </tr>\n        </table>\n      </div>\n      <h3>Share a static/animated image or video</h3>\n      <div class=\"share-thumbnail\">\n        <table class=\"share-thumbnail-tool\">\n          <tr>\n            <td>Set box size:</td>\n            <td><div class=\"reset-large customDialogButton\">Large</div><div class=\"reset-medium customDialogButton\">Medium</div><div class=\"reset-small customDialogButton\">Small</div></td>\n          </tr>\n          <tr>\n            <td>Starting time:</td>\n            <td><input class=\"startingTimeSpinner\" name=\"spinner\" value=\"\"></td>\n          </tr>\n          <tr>\n            <td>Duration:</td>\n            <td><div class=\"thumbnail-duration-slider customSlider\"></div></td>\n          </tr>\n          <tr>\n            <td>Ending time:</td>\n            <td><div class=\"endingTime\"></div></td>\n          </tr>\n          <tr>\n            <td>Playback rate:</td>\n            <td><div class=\"thumbnail-speed customDropdownButton\" data-speed=\"0.25\">0.25X</div></td>\n          </tr>\n          <tr>\n            <td>Embed time?</td>\n            <td><input type=\"checkbox\" class=\"embed-capture-time\" checked></td>\n          </tr>\n          <tr>\n            <td>Type:</td>\n            <td>\n              <div class=\"customDialogButton thumbnail-type-image selected\">Image</div>\n              <div class=\"customDialogButton thumbnail-type-video\">Video</div>\n            </td>\n          </tr>\n          <tr>\n            <td colspan=\"2\"><div class=\"generate-thumbnail customDialogButton customHighlightDialogButton\">Generate Image</div></td>\n          </tr>\n        </table>\n        <table class=\"thumbnail-preview-copy-text-container\">\n          <tr>\n            <td><input type=\"text\" class=\"thumbnail-preview-copy-text\"></td>\n            <td><div class=\"thumbnail-preview-copy-text-button customDialogButton\">Copy</div></td>\n          </tr>\n          <tr>\n            <td colspan=\"2\">\n              <div class=\"thumbnail-preview-container always-selectable\">\n                <br><a class=\"thumbnail-preview-link\" href=\"\"></a>\n              </div>\n            </td>\n          </tr>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>";
cached_ajax['templates/time_warp_composer.html']="<div class=\"toolbar\">\n  <div class=\"editorModeToolbar\"></div>\n  <button class=\"toggleMode\" title=\"Toggle between tour and slideshow editor\">Change Mode</button>\n  <ul class=\"editorModeOptions\"></ul>\n</div>\n\n<div class=\"snaplapse_keyframe_container\">\n  <div class=\"snaplapse_keyframe_list\"></div>\n</div>\n\n<div class=\"createSubtitle_dialog\" title=\"Edit Title and Subtitle\">\n  <table class=\"createSubtitle_dialog_table\">\n    <tr>\n      <td>\n        <div class=\"keyframe_title_container\">Keyframe Title:&nbsp;\n          <input type=\"text\" value=\"\" class=\"keyframe_title_input\" maxlength=\"20\">\n        </div>\n      </td>\n    </tr>\n    <tr>\n      <td>\n        <div class=\"createSubtitle_dialog_txt\">\n          Add a caption to this keyframe.\n        </div>\n      </td>\n    </tr>\n    <tr>\n      <td><textarea class=\"subtitle_textarea\"></textarea></td>\n    </tr>\n  </table>\n</div>\n\n<div class=\"loadTimewarpWindow\" title=\"Load a Tour or Slideshow\">\n  <table class=\"loadTimewarpWindowTable\">\n    <tr>\n      <td><div id=\"loadSnaplapseButton\" class=\"customDialogButton\">Load</div></td>\n      <td>\n        <div class=\"loadTimewarpWindow_txt\">\n          Paste the share link into the text box below and then click the Load button.\n        </div>\n      </td>\n    </tr>\n    <tr>\n      <td colspan=\"2\"><textarea class=\"loadTimewarpWindow_JSON\"></textarea></td>\n    </tr>\n  </table>\n</div>\n\n<div class=\"saveTimewarpWindow\" title=\"Share a Tour or Slideshow\">\n  <table class=\"saveTimewarpWindowTable\">\n    <tr>\n      <td>Title:&nbsp;<input type=\"text\" value=\"Untitled\" class=\"saveTimewarpWindow_tourTitleInput\" maxlength=\"30\"></td>\n    </tr>\n    <tr>\n      <td><h3 class=\"saveTimewarpWindow_title_share\">Save and Share</h3></td>\n    </tr>\n    <tr>\n      <td>\n        <div class=\"saveTimewarpWindow_txt\">\n          Copy the link below and share it on the web. Everyone who visits it will see the tour or slideshow you made.\n        </div>\n      </td>\n    </tr>\n    <tr>\n      <td><textarea class=\"saveTimewarpWindow_JSON\"></textarea></td>\n    </tr>\n    <tr>\n      <td><h3 class=\"saveTimewarpWindow_title_embed\">Embed</h3></td>\n    </tr>\n    <tr>\n      <td>\n        <div class=\"saveTimewarpWindow_txt2\">\n          You can also copy the iframe code below and embed this tour or slideshow on your own website or blog.\n        </div>\n      </td>\n    </tr>\n    <tr>\n      <td><textarea class=\"saveTimewarpWindow_JSON2\"></textarea></td>\n    </tr>\n    <tr>\n      <td>\n        Video Size:&nbsp;\n        <select class=\"saveTimewarpWindow_JSON2_sizes\">\n          <option value=\"720,394\">720 x 394</option>\n          <option value=\"750,530\">750 x 530</option>\n          <option value=\"854,480\" selected=\"selected\">854 x 480</option>\n          <option value=\"1024,576\">1024 x 576</option>\n          <option value=\"1152,648\">1152 x 648</option>\n        </select>\n      </td>\n    </tr>\n  </table>\n</div>\n\n<span class=\"keyframeSubtitleBoxForHovering\">\n  <p></p>\n</span>";
cached_ajax['templates/annotation_editor.html']="<div class=\"annotator\">\n  <div class=\"toolbar\">\n    <div class=\"annotator-title\">Create customized annotations</div>\n    <div class=\"annotatorModeToolbar\"></div>\n  </div>\n  <div class=\"annotation_container\">\n    <div class=\"annotation_list\"></div>\n  </div>\n  <div class=\"loadAnnotatorWindow\" title=\"Load annotations\">\n    <button class=\"loadAnnotatorButton\" title=\"Load annotations\">\n      Load\n    </button>\n    <div class=\"loadAnnotatorWindow_txt\">\n      To load annotations, paste the code into the text box below and then click the Load button.\n    </div>\n    <textarea class=\"loadAnnotatorWindow_JSON\"></textarea>\n  </div>\n\n  <div class=\"saveAnnotatorWindow\" title=\"Save annotations\">\n    <div class=\"saveAnnotatorWindow_txt\">\n      To save these annotations, copy the code contained in the text box below and paste it into a new file in your favorite text editor.\n    </div>\n    <textarea class=\"saveAnnotatorWindow_JSON\"></textarea>\n  </div>\n</div>\n";

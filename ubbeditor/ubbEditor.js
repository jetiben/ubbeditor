function ubbEditor(argId)
{
  this.uId = argId;
  this.uValue = '';
  this.uBaseURL = '';
  this.uPanelHeight = 26;
  this.uEditState = 1;
  this.uEditUBBMode = 1;
  this.uInstance = null;
  this.uSelection = null;
  this.uInputObject = null;
  this.uLang = 'zh-cn';
  this.uLangText = Array;
  this.uLangText['en'] = {
    tAbout: 'About:',
    tColorPicker: 'Color Picker:',
    tLinkURL: 'Link URL:',
    tImageURL: 'Image URL:',
    tSmileyImage: 'Emotion',
    tCode: 'Source Code',
    tHint: 'Hint:',
    tOK: 'OK',
    tCancel: 'Cancel',
    tError1: 'Source code mode can not do this'
  };
  this.uLangText['zh-cn'] = {
    tAbout: '关于：',
    tColorPicker: '拾色器：',
    tLinkURL: '链接地址：',
    tImageURL: '图片地址：',
    tSmileyImage: '帖图',
    tCode: '源代码',
    tHint: '提示：',
    tOK: '确定',
    tCancel: '取消',
    tError1: '源代码模式下无法进行此项操作'
  };
  this.uLangMap = null;
  this.uParamIndex = 0;
  this.uParamArray = Array;
  this.uTheme = 'default';
  this.uToolbar = 'default';
  this.uToolbarSets = Array;
  this.uToolbarSets['default'] = ['Source','separator','Bold','Italic','Underline','RemoveFormat','separator','Link','Unlink','Image','Smiley','separator','JustifyLeft','JustifyCenter','JustifyRight','JustifyFull','separator','OrderedList','UnorderedList','H1','H2','TextColor','BGColor','separator','Code','About'];
  this.uToolbarSets['simple'] = ['Bold','Italic','Underline','RemoveFormat','separator','JustifyLeft','JustifyCenter','JustifyRight','JustifyFull','separator','Link','Unlink','TextColor','BGColor','separator','About'];
  this.uToolbarSets['mini'] = ['Bold','Italic','Underline','RemoveFormat','separator','Link','Unlink','TextColor','BGColor','separator','About'];
  this.uToolbarSets['micro'] = ['Bold','Italic','Underline','RemoveFormat','separator','About'];
  this.uSystem = 'UBBEditor';
  this.uVersion = '2.0';
  this.uAuthor = 'Jetiben';
  this.uWebSite = 'github.com/jetiben';
  this.uEI = function(argId)
  {
    return document.getElementById(argId);
  };
  this.uEH = function(argStr, argTagName)
  {
    var uObject = null;
    var uStr = argStr;
    var uTagName = argTagName;
    if (uStr && uTagName)
    {
      var uObj = this.uEI(this.uId + '-divFactory');
      uObj.innerHTML = uStr;
      uObject = uObj.getElementsByTagName(uTagName).item(0);
    };
    return uObject;
  };
  this.uFW = function(argId)
  {
    var uId = argId;
    var uObj = this.uEI(uId).contentWindow;
    return uObj;
  };
  this.uPreCodeHighlightBlock = function()
  {
    var that = this;
    var thisInstance = this.uInstance;
    thisInstance.document.querySelectorAll('pre').forEach(function(itemObject){
      if (itemObject.getAttribute('class') == null)
      {
        that.uParamIndex += 1;
        that.uParamArray['precode' + that.uParamIndex] = itemObject.querySelector('code').innerHTML;
        itemObject.setAttribute('language', itemObject.querySelector('code').getAttribute('class'));
        itemObject.setAttribute('paramIndex', that.uParamIndex);
        thisInstance.hljs.highlightBlock(itemObject);
      };
    });
  };
  this.uRGB2Hex = function(argStr)
  {
    var uStr = argStr;
    var uRGB2HexI = 0;
    var uRGB2HexX = 255;
    var uRGB2HexValue = '';
    var uRegExp = /([0-9]+)[, ]+([0-9]+)[, ]+([0-9]+)/;
    var uArray = uRegExp.exec(uStr);
    if (!uArray) uRGB2HexValue = uStr;
    else
    {
      for(ti = 1; ti < uArray.length; ti ++) uRGB2HexValue += ('0' + parseInt(uArray[ti]).toString(16)).slice(-2);
      uRGB2HexValue = '#' + uRGB2HexValue;
    };
    return uRGB2HexValue;
  };
  this.uReplace = function(argStr, argArray)
  {
    var uStr = argStr;
    var uArray = argArray;
    var uState = true;
    for (var ti = 0; ti < uArray.length; ti ++)
    {
      if (!uArray[ti][2]) uStr = uStr.replace(uArray[ti][0], uArray[ti][1]);
    };
    while(uState)
    {
      uState = false;
      for (var ti = 0; ti < uArray.length; ti ++)
      {
        if (uArray[ti][2] && uStr.search(uArray[ti][0]) != -1)
        {
          uState = true;
          uStr = uStr.replace(uArray[ti][0], uArray[ti][1]);
        };
      };
    };
    return uStr;
  };
  this.uHTMLEncode = function(argStr)
  {
    var uStr = argStr;
    if (uStr)
    {
      uStr = uStr.replace(/&/igm, '&amp;');
      uStr = uStr.replace(/</igm, '&lt;');
      uStr = uStr.replace(/>/igm, '&gt;');
      uStr = uStr.replace(/\"/igm, '&quot;');
      uStr = uStr.replace(/ /igm, '&nbsp;');
    };
    return uStr;
  };
  this.uHTMLDecode = function(argStr)
  {
    var uStr = argStr;
    if (uStr)
    {
      uStr = uStr.replace(/&lt;/igm, '<');
      uStr = uStr.replace(/&gt;/igm, '>');
      uStr = uStr.replace(/&quot;/igm, '"');
      uStr = uStr.replace(/&nbsp;/igm, ' ');
      uStr = uStr.replace(/&amp;/igm, '&');
    };
    return uStr;
  };
  this.uHTMLClearSpecial = function(argStr)
  {
    var uStr = argStr;
    if (uStr)
    {
      uStr = uStr.replace(/<script[^>]*>[\s\S]*?<\/script[^>]*>/gim, '');
      uStr = uStr.replace(/<(\/?)(script|i?frame|style|html|head|body|title|link|meta|object|\?|\%)([^>]*?)>/gi, '');
    };
    return uStr;
  };
  this.uHTML2XHTML = function(argStr)
  {
    var uStr = argStr;
    if (uStr)
    {
      uStr = uStr.replace(/<br.*?>/ig, '<br />');
      uStr = uStr.replace(/(<hr\s+[^>]*[^\/])(>)/ig, '$1 />');
      uStr = uStr.replace(/(<img\s+[^>]*[^\/])(>)/ig, '$1 />');
    };
    return uStr;
  };
  this.uHtmlSquareEncode = function(argStr)
  {
    var uStr = argStr;
    if (uStr)
    {
      uStr = uStr.replace(/\[/igm, '⁅');
      uStr = uStr.replace(/\]/igm, '⁆');
    };
    return uStr;
  };
  this.uHtmlSquareDeEncode = function(argStr)
  {
    var uStr = argStr;
    if (uStr)
    {
      uStr = uStr.replace(/⁅/igm, '[');
      uStr = uStr.replace(/⁆/igm, ']');
    };
    return uStr;
  };
  this.uXHTML2UBB = function(argStr)
  {
    var uStr = argStr;
    if (uStr)
    {
      var that = this;
      var uReplaceAry = [
        [/<br \/>/ig, '[br]', false],
        [/<p><\/p>/ig, '', false],
        [/<p>([^<]*?)<\/p>/igm, '[p]$1[/p]', true],
        [/<b>([^<]*?)<\/b>/igm, '[b]$1[/b]', true],
        [/<strong>([^<]*?)<\/strong>/igm, '[b]$1[/b]', true],
        [/<i>([^<]*?)<\/i>/igm, '[i]$1[/i]', true],
        [/<em>([^<]*?)<\/em>/igm, '[i]$1[/i]', true],
        [/<u>([^<]*?)<\/u>/igm, '[u]$1[/u]', true],
        [/<h1>([^<]*?)<\/h1>/igm, '[h1]$1[/h1]', true],
        [/<h2>([^<]*?)<\/h2>/igm, '[h2]$1[/h2]', true],
        [/<ol>([^<]*?)<\/ol>/igm, '[ol]$1[/ol]', true],
        [/<ul>([^<]*?)<\/ul>/igm, '[ul]$1[/ul]', true],
        [/<li>([^<]*?)<\/li>/igm, '[li]$1[/li]', true],
        [/<span\s[^>]*?>([^<]*?)<\/span>/igm, function($0, $1) {
          var uString = $1;
          var uObj = that.uEH($0, 'span');
          if (uObj.style.fontWeight.toLowerCase() == 'bold') uString = '[b]' + uString + '[/b]';
          if (uObj.style.fontStyle.toLowerCase() == 'italic') uString = '[i]' + uString + '[/i]';
          if (uObj.style.textDecoration.toLowerCase() == 'underline') uString = '[u]' + uString + '[/u]';
          if (uObj.style.color) uString = '[color=' + that.uRGB2Hex(uObj.style.color) + ']' + uString + '[/color]';
          if (uObj.style.backgroundColor) uString = '[hilitecolor=' + that.uRGB2Hex(uObj.style.backgroundColor) + ']' + uString + '[/hilitecolor]';
          return uString;
        }, true],
        [/<font\s[^>]*?>([^<]*?)<\/font>/igm, function($0, $1) {
          var uString = $1;
          var uObj = that.uEH($0, 'font');
          if (uObj.getAttribute('color')) uString = '[color=' + that.uRGB2Hex(uObj.getAttribute('color')) + ']' + uString + '[/color]';
          if (uObj.style.color) uString = '[color=' + that.uRGB2Hex(uObj.style.color) + ']' + uString + '[/color]';
          if (uObj.style.backgroundColor) uString = '[hilitecolor=' + that.uRGB2Hex(uObj.style.backgroundColor) + ']' + uString + '[/hilitecolor]';
          return uString;
        }, true],
        [/<p\s[^>]*?>([^<]*?)<\/p>/igm, function($0, $1) {
          var uString = $1;
          var uObj = that.uEH($0, 'p');
          if (uObj.style.fontWeight.toLowerCase() == 'bold') uString = '[b]' + uString + '[/b]';
          if (uObj.getAttribute('color')) uString = '[color=' + that.uRGB2Hex(uObj.getAttribute('color')) + ']' + uString + '[/color]';
          if (uObj.style.color) uString = '[color=' + that.uRGB2Hex(uObj.style.color) + ']' + uString + '[/color]';
          if (uObj.style.backgroundColor) uString = '[hilitecolor=' + that.uRGB2Hex(uObj.style.backgroundColor) + ']' + uString + '[/hilitecolor]';
          if (uObj.style.textAlign) uString = '[align=' + uObj.style.textAlign + ']' + uString + '[/align]';
          else if (uObj.getAttribute('align')) uString = '[align=' + uObj.getAttribute('align') + ']' + uString + '[/align]';
          uString = '[p]' + uString + '[/p]';
          return uString;
        }, true],
        [/<li\s[^>]*?>([^<]*?)<\/li>/igm, function($0, $1) {
          var uString = $1;
          var uObj = that.uEH($0, 'li');
          if (uObj.style.fontWeight.toLowerCase() == 'bold') uString = '[b]' + uString + '[/b]';
          if (uObj.style.color) uString = '[color=' + that.uRGB2Hex(uObj.style.color) + ']' + uString + '[/color]';
          if (uObj.style.backgroundColor) uString = '[hilitecolor=' + that.uRGB2Hex(uObj.style.backgroundColor) + ']' + uString + '[/hilitecolor]';
          if (uObj.style.textAlign) uString = '[align=' + uObj.style.textAlign + ']' + uString + '[/align]';
          else if (uObj.getAttribute('align')) uString = '[align=' + uObj.getAttribute('align') + ']' + uString + '[/align]';
          uString = '[li]' + uString + '[/li]';
          return uString;
        }, true],
        [/<div\s[^>]*?>([^<]*?)<\/div>/igm, function($0, $1) {
          var uString = $1;
          var uObj = that.uEH($0, 'div');
          if (uObj.className == 'ubb_quote') uString = '[quote]' + uString + '[/quote]';
          if (uObj.style.textAlign) uString = '[align=' + uObj.style.textAlign + ']' + uString + '[/align]';
          else if (uObj.getAttribute('align')) uString = '[align=' + uObj.getAttribute('align') + ']' + uString + '[/align]';
          return uString;
        }, true],
        [/<a\s[^>]*?>([^<]*?)<\/a>/igm, function($0, $1) {
          var uString = $1;
          var uObj = that.uEH($0, 'a');
          if (uObj.getAttribute('href')) uString = '[url=' + uObj.getAttribute('href') + ']' + uString + '[/url]';
          return uString;
        }, true],
        [/<img\s[^>]*?>/igm, function($0) {
          var uObj = that.uEH($0, 'img');
          if (uObj.getAttribute('src')) uString = '[img]' + uObj.getAttribute('src') + '[/img]';
          return uString;
        }, true],
        [/<pre\s[^>]*?>([\s\S]*?)<\/pre>/igm, function($0, $1) {
          var uString = '';
          var uObj = that.uEH($0, 'pre');
          if (uObj.getAttribute('paramIndex') && uObj.getAttribute('language')) uString = '[code=' + uObj.getAttribute('language') + ']' + that.uHtmlSquareEncode(that.uParamArray['precode' + uObj.getAttribute('paramIndex')]) + '[/code]';
          return uString;
        }, true],
        [/\[p\]\n/igm, '[p]', true],
        [/(\n)\1+/igm, '\n', true]
      ];
      uStr = this.uHtmlSquareEncode(uStr);
      uStr = this.uReplace(uStr, uReplaceAry);
      uStr = uStr.replace(/<[^>]*>/igm, '');
      uStr = this.uHTMLDecode(uStr);
    };
    return uStr;
  };
  this.uUBB2XHTML = function(argStr)
  {
    var uStr = argStr;
    if (uStr)
    {
      var uReplaceAry = [
        [/\[br\]/igm, '<br />', false],
        [/\[p\]([^\[]*?)\[\/p\]/igm, '<p>$1</p>', true],
        [/\[b\]([^\[]*?)\[\/b\]/igm, '<b>$1</b>', true],
        [/\[i\]([^\[]*?)\[\/i\]/igm, '<i>$1</i>', true],
        [/\[u\]([^\[]*?)\[\/u\]/igm, '<u>$1</u>', true],
        [/\[h1\]([^\[]*?)\[\/h1\]/igm, '<h1>$1</h1>', true],
        [/\[h2\]([^\[]*?)\[\/h2\]/igm, '<h2>$1</h2>', true],
        [/\[ol\]([^\[]*?)\[\/ol\]/igm, '<ol>$1</ol>', true],
        [/\[ul\]([^\[]*?)\[\/ul\]/igm, '<ul>$1</ul>', true],
        [/\[li\]([^\[]*?)\[\/li\]/igm, '<li>$1</li>', true],
        [/\[code=([^\]]*)\]([\s\S]*?)\[\/code\]/igm, '<pre contentEditable="false"><code class="$1">$2</code></pre>', true],
        [/\[quote\]([^\[]*?)\[\/quote\]/igm, '<div class="ubb_quote" contentEditable="false">$1</div>', true],
        [/\[color=([^\]]*)\]([^\[]*?)\[\/color\]/igm, '<span style="color: $1">$2</span>', true],
        [/\[hilitecolor=([^\]]*)\]([^\[]*?)\[\/hilitecolor\]/igm, '<span style="background-color: $1">$2</span>', true],
        [/\[align=([^\]]*)\]([^\[]*?)\[\/align\]/igm, '<div align="$1">$2</div>', true],
        [/\[url=([^\]]*)\]([^\[]*?)\[\/url\]/igm, '<a href="$1">$2</a>', true],
        [/\[img\]([^\[]*?)\[\/img\]/igm, '<img src="$1" />', true],
        [/(\n)\1+/igm, '\n', true]
      ];
      uStr = this.uHTMLEncode(uStr);
      uStr = this.uReplace(uStr, uReplaceAry);
      uStr = this.uHtmlSquareDeEncode(uStr);
    };
    return uStr;
  };
  this.uCreateStyleSheet = function()
  {
    var uCssObj = document.getElementById('ubbEditorCss');
    if (uCssObj == null)
    {
      var uObj = document.getElementsByTagName('head').item(0) || document.getElementsByTagName('body').item(0);
      if (uObj != null)
      {
        var uLink = document.createElement('link');
        uLink.setAttribute('id', 'ubbEditorCss');
        uLink.setAttribute('rel', 'stylesheet');
        uLink.setAttribute('type', 'text/css');
        uLink.setAttribute('href', this.uBaseURL + 'common/theme/' + this.uTheme + '/css/editor.css');
        uObj.appendChild(uLink);
      };
    };
  };
  this.uInsertUBB = function(argValue)
  {
    var uValue = argValue;
    uValue = this.uUBB2XHTML(uValue);
    this.uInsertHTML(uValue);
  };
  this.uInsertHTML = function(argValue)
  {
    var uValue = argValue;
    if (uValue && this.uEditState == 1)
    {
      this.uExecCommand('insertHTML', uValue);
      this.uPreCodeHighlightBlock();
      var uStrikeObj = this.uInstance.document.querySelectorAll('strike');
      if (uStrikeObj != null)
      {
        uStrikeObj.forEach(function(itemObject){
          var uStrikeParentObj = itemObject.parentNode;
          if (uStrikeParentObj.tagName == 'P') uStrikeParentObj.parentNode.removeChild(uStrikeParentObj);
        });
      };
    };
  };
  this.uSetCommand = function(argCommand, argValue)
  {
    var uCommand = argCommand;
    var uValue = argValue;
    if (this.uEditState == 1)
    {
      switch (uCommand)
      {
        case 'About':
          this.uLoadAbout();
          break;
        case 'Source':
          this.uShowSource();
          break;
        case 'RemoveFormat':
          this.uExecCommand('RemoveFormat');
          break;
        case 'Bold':
          this.uExecCommand('Bold');
          break;
        case 'Italic':
          this.uExecCommand('Italic');
          break;
        case 'Underline':
          this.uExecCommand('Underline');
          break;
        case 'OrderedList':
          this.uExecCommand('InsertOrderedList');
          break;
        case 'UnorderedList':
          this.uExecCommand('InsertUnorderedList');
          break;
        case 'JustifyLeft':
          this.uExecCommand('JustifyLeft');
          break;
        case 'JustifyCenter':
          this.uExecCommand('JustifyCenter');
          break;
        case 'JustifyRight':
          this.uExecCommand('JustifyRight');
          break;
        case 'JustifyFull':
          this.uExecCommand('JustifyFull');
          break;
        case 'H1':
          this.uExecCommand('FormatBlock', 'H1');
          break;
        case 'H2':
          this.uExecCommand('FormatBlock', 'H2');
          break;
        case 'TextColor':
          this.uLoadForeColorPopup();
          break;
        case 'TextColorS':
          this.uLoadMaskClose();
          this.uExecCommand('ForeColor', uValue);
          break;
        case 'BGColor':
          this.uLoadBackColorPopup();
          break;
        case 'BGColorS':
          this.uLoadMaskClose();
          this.uExecCommand('BackColor', uValue);
          break;
        case 'Link':
          this.uLoadLinkPopup();
          this.uGetSelection();
          break;
        case 'LinkS':
          this.uLoadMaskClose();
          this.uExecCommand('CreateLink', uValue);
          break;
        case 'Unlink':
          this.uExecCommand('Unlink');
          break;
        case 'Image':
          this.uLoadImagePopup();
          this.uGetSelection();
          break;
        case 'ImageS':
          this.uLoadMaskClose();
          this.uExecCommand('InsertImage', uValue);
          break;
        case 'Smiley':
          this.uLoadSmileyPopup();
          break;
        case 'SmileyS':
          this.uLoadMaskClose();
          this.uExecCommand('InsertText', uValue);
          break;
        case 'Code':
          this.uLoadCodePopup();
          break;
      };
    }
    else
    {
      if (uCommand == 'Source') this.uShowNormal();
      else this.uLoadMessage(this.uLangMap.tError1);
    };
  };
  this.uExecCommand = function(argCommand, argValue)
  {
    var uCommand = argCommand;
    var uValue = argValue;
    this.uGetSelection();
    var uFocusNode = this.uSelection.focusNode;
    var uSpecialCommand = new Array('Bold','Italic','Underline','RemoveFormat','ForeColor','BackColor');
    if (uSpecialCommand.indexOf(uCommand) == -1 || this.uSelection.isCollapsed == false || uFocusNode.nodeType != 3) this.uInstance.document.execCommand(uCommand, false, uValue);
    else
    {
      var uCurrentRangeStartOffset = 0;
      var uCurrentRangeEndOffset = 0;
      if (this.uSelection.rangeCount != 0)
      {
        var uCurrentRange = this.uSelection.getRangeAt(0);
        uCurrentRangeStartOffset = uCurrentRange.startOffset;
        uCurrentRangeEndOffset = uCurrentRange.endOffset;
      };
      this.uSelection.selectAllChildren(uFocusNode.parentNode);
      this.uInstance.document.execCommand(uCommand, false, uValue);
      this.uSelection.removeAllRanges();
      var uNewRange = document.createRange();
      uNewRange.setStart(uFocusNode, uCurrentRangeStartOffset);
      uNewRange.setEnd(uFocusNode, uCurrentRangeEndOffset);
      this.uSelection.addRange(uNewRange);
    };
  };
  this.uGetHTML = function()
  {
    var uHTML = this.uInstance.document.body.innerHTML;
    return uHTML;
  };
  this.uGetUBB = function()
  {
    var uHTML = this.uGetHTML();
    uHTML = this.uHTML2XHTML(uHTML);
    uHTML = this.uHTMLClearSpecial(uHTML);
    uHTML = this.uXHTML2UBB(uHTML);
    return uHTML;
  };
  this.uGetSelection = function()
  {
    this.uSelection = this.uInstance.getSelection();
    if (this.uSelection.type == 'None'|| this.uSelection.focusNode.tagName == 'BODY')
    {
      var uChildNodes = this.uInstance.document.body.childNodes;
      if (uChildNodes.length != 0)
      {
        var uSelectNode = uChildNodes.item(uChildNodes.length - 1);
        while (uSelectNode.childNodes.length != 0)
        {
          uSelectNode = uSelectNode.childNodes.item(uSelectNode.childNodes.length - 1);
        };
        if (uSelectNode.tagName == 'BR') uSelectNode = uSelectNode.parentNode;
        this.uSelection.selectAllChildren(uSelectNode);
        if (uSelectNode.nodeType == 3)
        {
          this.uSelection.removeAllRanges();
          var uNewRange = document.createRange();
          uNewRange.setStart(uSelectNode, uSelectNode.length);
          uNewRange.setEnd(uSelectNode, uSelectNode.length);
          this.uSelection.addRange(uNewRange);
        }
        else this.uSelection.collapseToStart();
        this.uInstance.document.body.focus();
      };
    }
    else this.uInstance.document.body.focus();
  };
  this.uSetInputValue = function()
  {
    var uHTML = this.uGetHTML();
    uHTML = this.uHTML2XHTML(uHTML);
    uHTML = this.uHTMLClearSpecial(uHTML);
    uHTML = this.uXHTML2UBB(uHTML);
    if (this.uEditUBBMode == 0) uHTML = this.uUBB2XHTML(uHTML);
    this.uInputObject.value = uHTML;
  };
  this.uShowSource = function()
  {
    if (this.uEditState == 1)
    {
      var uSourceImageObj;
      var uHTML = this.uGetHTML();
      this.uEditState = 0;
      uHTML = this.uHTML2XHTML(uHTML);
      uHTML = this.uHTMLClearSpecial(uHTML);
      uHTML = this.uXHTML2UBB(uHTML);
      if (this.uEditUBBMode == 0) uHTML = this.uUBB2XHTML(uHTML);
      uSourceImageObj = this.uEI(this.uId + '-ubbEditorToolbar-Source');
      uSourceImageObj.className = 'ubbEditorToolbarItem ubbEditorToolbarItemSelected';
      this.uEI(this.uId + '-textarea').style.display = '';
      this.uEI(this.uId + '-iframe').style.display = 'none';
      this.uEI(this.uId + '-textarea').value = uHTML;
    };
  };
  this.uShowNormal = function()
  {
    if (this.uEditState == 0)
    {
      var uSourceImageObj;
      var uValue = this.uEI(this.uId + '-textarea').value;
      if (!uValue || uValue == '[br]') uValue = '[p][br][/p]';
      this.uEditState = 1;
      if (this.uEditUBBMode == 1) uValue = this.uUBB2XHTML(uValue);
      else uValue = this.uHTMLClearSpecial(uValue);
      uSourceImageObj = this.uEI(this.uId + '-ubbEditorToolbar-Source');
      uSourceImageObj.className = 'ubbEditorToolbarItem';
      this.uEI(this.uId + '-textarea').style.display = 'none';
      this.uEI(this.uId + '-iframe').style.display = '';
      this.uInstance.document.body.innerHTML = uValue;
      this.uPreCodeHighlightBlock();
    };
  };
  this.uLoadToolbar = function(argObj)
  {
    var that = this;
    var uObj = argObj;
    if (uObj)
    {
      var uHTMLString1 = '';
      var uArray1 = this.uToolbarSets[this.uToolbar];
      if (!uArray1) uArray1 = this.uToolbarSets['default'];
      for (var uKey1 in uArray1)
      {
        var uKey = uArray1[uKey1];
        if (uKey == 'separator') uHTMLString1 += '<span class="separator"></span>';
        else uHTMLString1 += '<span id="' + this.uId + '-ubbEditorToolbar-' + uKey + '" class="ubbEditorToolbarItem" style="background-image:url(' + this.uBaseURL + 'common/theme/' + this.uTheme + '/images/icon/' + uKey + '.svg)" ukey="' + uKey + '"></span>';
      };
      uObj.innerHTML = uHTMLString1;
      uObj.querySelectorAll('.ubbEditorToolbarItem').forEach(function(itemObject){
        itemObject.addEventListener('click', function(){ that.uSetCommand(this.getAttribute('ukey')); });
      });
    };
  };
  this.uLoadMask = function()
  {
    var uObj = this.uEI(this.uId + '-div');
    if (uObj)
    {
      var uDiv1 = document.createElement('div');
      uDiv1.setAttribute('id', this.uId + '-ubbEditorMask');
      uDiv1.className = 'ubbEditorMask';
      uObj.appendChild(uDiv1);
      var uDiv2 = document.createElement('div');
      uDiv2.setAttribute('id', this.uId + '-ubbEditorMaskDIV');
      uDiv2.className = 'ubbEditorMaskDIV';
      uObj.appendChild(uDiv2);
    };
  };
  this.uLoadMaskShow = function(argHTML)
  {
    var that = this;
    var uHTML = argHTML;
    if (uHTML)
    {
      var uObj = this.uEI(this.uId + '-ubbEditorMaskDIV');
      if (!uObj)
      {
        this.uLoadMask();
        uObj = this.uEI(this.uId + '-ubbEditorMaskDIV');
      };
      if (uObj)
      {
        var uObjInnerHTML = '<div class="ubbEditorWindow">';
        uObjInnerHTML += uHTML;
        uObjInnerHTML += '<div class="ubbEditorWindowClose"></div>';
        uObjInnerHTML += '</div>';
        uObj.style.display = 'none';
        uObj.innerHTML = uObjInnerHTML;
        uObj.style.display = 'block';
        uObj.querySelector('.ubbEditorWindowClose').addEventListener('click', function(){ that.uLoadMaskClose(); });
        if (uObj.querySelector('.ubbEditorButtonClose')) uObj.querySelector('.ubbEditorButtonClose').addEventListener('click', function(){ that.uLoadMaskClose(); });
        if (uObj.querySelector('.ubbEditorSetCommand'))
        {
          uObj.querySelectorAll('.ubbEditorSetCommand').forEach(function(itemObject){
            itemObject.addEventListener('click', function(){
              var uCurrentSetCommand = this.getAttribute('setCommand');
              if (uCurrentSetCommand == 'LinkS' || uCurrentSetCommand == 'ImageS')
              {
                that.uSetCommand(uCurrentSetCommand, uObj.querySelector('.ubbEditorInputText').value);
              }
              else if (uCurrentSetCommand == 'TextColorS' || uCurrentSetCommand == 'BGColorS')
              {
                that.uSetCommand(uCurrentSetCommand, this.getAttribute('setColor'));
              }
              else if (uCurrentSetCommand == 'SmileyS')
              {
                that.uSetCommand(uCurrentSetCommand, this.getAttribute('setSmiley'));
              }
              else if (uCurrentSetCommand == 'CodeS')
              {
                var uCurrentCodeLanguage = uObj.querySelector('.ubbEditorCodeSelect').value;
                var uCurrentCodeContent = uObj.querySelector('.ubbEditorCodeTextarea').value;
                if (uCurrentCodeContent)
                {
                  that.uInsertHTML('<pre contentEditable="false"><code class="' + that.uHTMLEncode(uCurrentCodeLanguage) + '">' + that.uHTMLEncode(uCurrentCodeContent) + '</code></pre><p><br /></p>');
                };
                that.uLoadMaskClose();
              };
            });
          });
        };
        uObj.style.marginLeft = (0 - Math.floor(uObj.offsetWidth / 2)) + 'px';
        uObj.style.marginTop = (0 - Math.floor(uObj.offsetHeight / 2) + 14) + 'px';
      };
    };
  };
  this.uLoadMaskClose = function()
  {
    var uObj = this.uEI(this.uId + '-div');
    if (uObj)
    {
      var uObj21 = this.uEI(this.uId + '-ubbEditorMask');
      var uObj22 = this.uEI(this.uId + '-ubbEditorMaskDIV');
      if (uObj21 && uObj22)
      {
        uObj.removeChild(uObj21);
        uObj.removeChild(uObj22);
      };
    };
  };
  this.uLoadAbout = function()
  {
    var uPopupHTML = '<div class="ubbEditorPopup">';
    uPopupHTML += '  <div class="ubbEditorPopupTitle">' + this.uLangMap.tAbout + '</div>';
    uPopupHTML += '  <div class="ubbEditorPopupMain"><span class="ubbEditorPopupTips">' +  this.uSystem + ', Version: ' + this.uVersion + '</span></div>';
    uPopupHTML += '  <div class="ubbEditorPopupButton"><button class="ubbEditorButtonA ubbEditorButtonClose">' + this.uLangMap.tOK + '</button></div>';
    uPopupHTML += '</div>';
    this.uLoadMaskShow(uPopupHTML);
  };
  this.uLoadMessage = function(argStr)
  {
    var uStr = argStr;
    var uPopupHTML = '<div class="ubbEditorPopup">';
    uPopupHTML += '  <div class="ubbEditorPopupTitle">' + this.uLangMap.tHint + '</div>';
    uPopupHTML += '  <div class="ubbEditorPopupMain"><span class="ubbEditorPopupTips">' + uStr + '</span></div>';
    uPopupHTML += '  <div class="ubbEditorPopupButton"><button class="ubbEditorButtonA ubbEditorButtonClose">' + this.uLangMap.tOK + '</button></div>';
    uPopupHTML += '</div>';
    this.uLoadMaskShow(uPopupHTML);
  };
  this.uLoadLinkPopup = function()
  {
    var uPopupHTML = '<div class="ubbEditorPopup">';
    uPopupHTML += '  <div class="ubbEditorPopupTitle">' + this.uLangMap.tLinkURL + '</div>';
    uPopupHTML += '  <div class="ubbEditorPopupMain"><input type="text" class="ubbEditorInputText" ondblclick="this.select();" /></div>';
    uPopupHTML += '  <div class="ubbEditorPopupButton"><button class="ubbEditorButtonA ubbEditorSetCommand" setCommand="LinkS">' + this.uLangMap.tOK + '</button>&nbsp;<button class="ubbEditorButtonB ubbEditorButtonClose">' + this.uLangMap.tCancel + '</button></div>';
    uPopupHTML += '</div>';
    this.uLoadMaskShow(uPopupHTML);
  },
  this.uLoadImagePopup = function()
  {
    var uPopupHTML = '<div class="ubbEditorPopup">';
    uPopupHTML += '  <div class="ubbEditorPopupTitle">' + this.uLangMap.tImageURL + '</div>';
    uPopupHTML += '  <div class="ubbEditorPopupMain"><input type="text" class="ubbEditorInputText" ondblclick="this.select();" /></div>';
    uPopupHTML += '  <div class="ubbEditorPopupButton"><button class="ubbEditorButtonA ubbEditorSetCommand" setCommand="ImageS">' + this.uLangMap.tOK + '</button>&nbsp;<button class="ubbEditorButtonB ubbEditorButtonClose">' + this.uLangMap.tCancel + '</button></div>';
    uPopupHTML += '</div>';
    this.uLoadMaskShow(uPopupHTML);
  },
  this.uLoadForeColorPopup = function()
  {
    var uColorHexAry = new Array('00','88','CC','FF');
    var uColorHexAryLength = uColorHexAry.length;
    var uPopupHTML = '<div class="ubbEditorPopup">';
    uPopupHTML += '  <div class="ubbEditorPopupTitle">' + this.uLangMap.tColorPicker + '</div>';
    uPopupHTML += '  <div class="ubbEditorPopupMain">';
    uPopupHTML += '    <div class="ubbEditorPopupColor">';
    for (var ti = 0; ti < uColorHexAryLength; ti ++)
    {
      for (var tj = 0; tj < uColorHexAryLength; tj ++)
      {
        for (var tk = 0; tk < uColorHexAryLength; tk ++)
        {
          uPopupHTML +='<span class="ubbEditorColorBox ubbEditorSetCommand" setCommand="TextColorS" setColor="#' + uColorHexAry[ti] + uColorHexAry[tj] + uColorHexAry[tk] + '" style="BACKGROUND: #' + uColorHexAry[ti] + uColorHexAry[tj] + uColorHexAry[tk] + '"></span>';
        };
      };
    };
    uPopupHTML += '    </div>';
    uPopupHTML += '  </div>';
    uPopupHTML += '</div>';
    this.uLoadMaskShow(uPopupHTML);
  };
  this.uLoadBackColorPopup = function()
  {
    var uColorHexAry = new Array('00','88','CC','FF');
    var uColorHexAryLength = uColorHexAry.length;
    var uPopupHTML = '<div class="ubbEditorPopup">';
    uPopupHTML += '  <div class="ubbEditorPopupTitle">' + this.uLangMap.tColorPicker + '</div>';
    uPopupHTML += '  <div class="ubbEditorPopupMain">';
    uPopupHTML += '    <div class="ubbEditorPopupColor">';
    for (var ti = 0; ti < uColorHexAryLength; ti ++)
    {
      for (var tj = 0; tj < uColorHexAryLength; tj ++)
      {
        for (var tk = 0; tk < uColorHexAryLength; tk ++)
        {
          uPopupHTML +='<span class="ubbEditorColorBox ubbEditorSetCommand" setCommand="BGColorS" setColor="#' + uColorHexAry[ti] + uColorHexAry[tj] + uColorHexAry[tk] + '" style="BACKGROUND: #' + uColorHexAry[ti] + uColorHexAry[tj] + uColorHexAry[tk] + '"></span>';
        };
      };
    };
    uPopupHTML += '    </div>';
    uPopupHTML += '  </div>';
    uPopupHTML += '</div>';
    this.uLoadMaskShow(uPopupHTML);
  };
  this.uLoadSmileyPopup = function()
  {
    var uSmileyArray = new Array('😁','😂','😃','😄','😅','😆','😉','😊','😋','😌','😍','😏','😒','😓','😔','😖','😘','😚','😜','😝','😞','😠','😡','😢','😣','😤','😥','😨','😩','😪','😫','😭','😰','😱','😲','😳','😵','😷','😀','😎');
    var uPopupHTML = '<div class="ubbEditorPopup">';
    uPopupHTML += '  <div class="ubbEditorPopupTitle">' + this.uLangMap.tImageURL + '</div>';
    uPopupHTML += '  <div class="ubbEditorPopupMain">';
    uPopupHTML += '    <div class="ubbEditorPopupSmiley">';
    for (var ti = 0; ti < uSmileyArray.length; ti ++)
    {
      uPopupHTML +='<span class="ubbEditorSmileyBox ubbEditorSetCommand" setCommand="SmileyS" setSmiley="' + uSmileyArray[ti] + '">' + uSmileyArray[ti] + '</span>';
    };
    uPopupHTML += '    </div>';
    uPopupHTML += '  </div>';
    uPopupHTML += '</div>';
    this.uLoadMaskShow(uPopupHTML);
  },
  this.uLoadCodePopup = function()
  {
    var uPopupHTML = '<div class="ubbEditorPopup">';
    uPopupHTML += '  <div class="ubbEditorPopupTitle">' + this.uLangMap.tCode + '</div>';
    uPopupHTML += '  <div class="ubbEditorPopupMain">';
    uPopupHTML += '    <ul>';
    uPopupHTML += '      <li><select name="language" class="ubbEditorCodeSelect"><option value="apache">Apache</option><option value="cpp">C++</option><option value="csharp">C#</option><option value="css">CSS</option><option value="go">Go</option><option value="html" selected="selected">HTML</option><option value="java">Java</option><option value="javascript">JavaScript</option><option value="json">JSON</option><option value="nginx">Nginx</option><option value="php">PHP</option><option value="python">Python</option><option value="sql">SQL</option></select></li>';
    uPopupHTML += '      <li><textarea name="content" class="ubbEditorCodeTextarea"></textarea></li>';
    uPopupHTML += '    </ul>';
    uPopupHTML += '  </div>';
    uPopupHTML += '  <div class="ubbEditorPopupButton"><button class="ubbEditorButtonA ubbEditorSetCommand" setCommand="CodeS">' + this.uLangMap.tOK + '</button>&nbsp;<button class="ubbEditorButtonB ubbEditorButtonClose">' + this.uLangMap.tCancel + '</button></div>';
    uPopupHTML += '</div>';
    this.uLoadMaskShow(uPopupHTML);
  },
  this.uInit = function(argBaseURL)
  {
    var that = this;
    this.uBaseURL = argBaseURL;
    this.uLangMap = this.uLangText[this.uLang];
    var uIdObject = this.uEI(this.uId);
    if (uIdObject)
    {
      this.uCreateStyleSheet();
      this.uValue = uIdObject.value;
      var uIdObjectName = uIdObject.name;
      var uIdObjectWidth = uIdObject.offsetWidth;
      var uIdObjectHeight = uIdObject.offsetHeight;
      var uDivObject = document.createElement('div');
      uDivObject.setAttribute('id', this.uId + '-div');
      uDivObject.style.width = uIdObjectWidth + 'px';
      uDivObject.style.height = uIdObjectHeight + 'px';
      uDivObject.className = 'ubbEditorDiv';
      uIdObject.parentNode.appendChild(uDivObject);
      uIdObject.parentNode.replaceChild(uDivObject, uIdObject);
      var uInputObject = document.createElement('input');
      uInputObject.type = 'hidden';
      uInputObject.name = uIdObjectName;
      uDivObject.appendChild(uInputObject);
      this.uInputObject = uInputObject;
      var uDivPanelObject = document.createElement('div');
      uDivPanelObject.setAttribute('id', this.uId + '-divPanel');
      uDivPanelObject.style.height = this.uPanelHeight + 'px';
      uDivPanelObject.className = 'ubbEditorDivPanel';
      uDivObject.appendChild(uDivPanelObject);
      this.uLoadToolbar(uDivPanelObject);
      var uDivFactoryObject = document.createElement('div');
      uDivFactoryObject.setAttribute('id', this.uId + '-divFactory');
      uDivFactoryObject.style.display = 'none';
      uDivObject.appendChild(uDivFactoryObject);
      var uTextareaObject = document.createElement('textarea');
      uTextareaObject.setAttribute('id', this.uId + '-textarea');
      uTextareaObject.style.display = 'none';
      uTextareaObject.className = 'ubbEditorTextarea';
      uDivObject.appendChild(uTextareaObject);
      var uIframeObject = document.createElement('iframe');
      uIframeObject.setAttribute('id', this.uId + '-iframe');
      uIframeObject.setAttribute('frameBorder', '0');
      uIframeObject.setAttribute('allowTransparency', 'true');
      uIframeObject.style.width = uIdObjectWidth + 'px';
      uIframeObject.style.height = (uIdObjectHeight - this.uPanelHeight - 10) + 'px';
      uIframeObject.className = 'ubbEditorIframe';
      uDivObject.appendChild(uIframeObject);
      var uFWObject = this.uFW(this.uId + '-iframe');
      if (this.uEditUBBMode == 1) this.uValue = this.uUBB2XHTML(this.uValue);
      uFWObject.document.open();
      uFWObject.document.writeln('<!DOCTYPE html><html><head><link href="' + this.uBaseURL + 'vendor/highlight/styles/monokai.css" rel="stylesheet" type="text/css" /><link href="' + this.uBaseURL + 'common/theme/' + this.uTheme + '/css/iframe.css" rel="stylesheet" type="text/css" /></head><body contentEditable="true" dir="ltr"></body></html>');
      uFWObject.document.close();
      uFWObject.document.body.style.minHeight = (uIdObjectHeight - this.uPanelHeight - 30) + 'px';
      var uCurrentValue = this.uValue;
      if (!uCurrentValue) uCurrentValue = '<p><br /></p>';
      uFWObject.document.body.innerHTML = uCurrentValue;
      this.uInstance = uFWObject;
      var uLastDocumentNode = uFWObject.document.body.childNodes.item(uFWObject.document.body.childElementCount - 1);
      if (uLastDocumentNode.tagName != 'P')
      {
        that.uGetSelection();
        that.uSelection.removeAllRanges();
        var uNewP = document.createElement('p');
        uNewP.innerHTML = '<br />';
        that.uInstance.document.body.appendChild(uNewP);
        that.uSelection.selectAllChildren(uNewP);
        that.uSelection.collapseToStart();
      };
      var uHighlightScript = document.createElement('script');
      uHighlightScript.setAttribute('src', this.uBaseURL + 'vendor/highlight/highlight.pack.js');
      uFWObject.document.getElementsByTagName('head').item(0).appendChild(uHighlightScript);
      uHighlightScript.addEventListener('load', function(){ that.uPreCodeHighlightBlock(); });
      uFWObject.document.body.addEventListener('keydown', function(e){
        if (e.keyCode == 8)
        {
          that.uGetSelection();
          if (that.uSelection.focusNode != null)
          {
            var uPrevElement = that.uSelection.focusNode.previousElementSibling;
            if (that.uSelection.focusNode.tagName == 'BODY') e.preventDefault();
            else if (uPrevElement == null && that.uSelection.focusNode.nodeType == 1 && that.uSelection.focusNode.parentNode.tagName == 'BODY') e.preventDefault();
            else
            {
              if (that.uSelection.focusNode.nodeType == 3)
              {
                if (that.uSelection.focusOffset == 0) uPrevElement = that.uSelection.focusNode.parentNode.previousElementSibling;
              };
              if (uPrevElement != null && (uPrevElement.tagName == 'PRE' || (uPrevElement.tagName == 'DIV' && uPrevElement.className == 'ubb_quote')))
              {
                e.preventDefault();
                var uPrevElementParent = uPrevElement.parentNode;
                uPrevElementParent.removeChild(uPrevElement);
                var uInstanceAllPObj = that.uInstance.document.querySelectorAll('p');
                if (uInstanceAllPObj != null)
                {
                  uInstanceAllPObj.forEach(function(itemObject){
                    if (itemObject.innerHTML == '') itemObject.parentNode.removeChild(itemObject);
                  });
                };
              };
            };
          };
        };
      });
      uFWObject.document.body.addEventListener('blur', function(){ that.uSetInputValue(); });
      uFWObject.document.body.addEventListener('input', function(){
        if (that.uEditState == 1)
        {
          that.uGetSelection();
          var uIsInnerHTMLEmpty = function(argStr)
          {
            var uStr = argStr;
            var uBool = false;
            uStr = uStr.toLowerCase().trim();
            if (uStr == '' || uStr == '<br>' || uStr == '<br />') uBool = true;
            return uBool;
          };
          var uFocusNode = that.uSelection.focusNode;
          var uParentNode = uFocusNode.parentNode;
          if (uFocusNode.nodeName == 'DIV')
          {
            var uReplaceNewP = true;
            if (uFocusNode.getAttribute('align')) uReplaceNewP = false;
            else if (uFocusNode.getAttribute('class')) uReplaceNewP = false;
            if (uReplaceNewP == true)
            {
              var uNewP = document.createElement('p');
              uNewP.innerHTML = uFocusNode.innerHTML;
              uParentNode.replaceChild(uNewP, uFocusNode);
              that.uSelection.selectAllChildren(uNewP);
              that.uSelection.collapseToStart();
            };
          };
          if (uIsInnerHTMLEmpty(that.uInstance.document.body.innerHTML))
          {
            that.uGetSelection();
            that.uSelection.removeAllRanges();
            that.uInstance.document.body.innerHTML = '<p><br /></p>';
            that.uSelection.selectAllChildren(that.uInstance.document.querySelector('p'));
            that.uSelection.collapseToStart();
          };
        };
      });
      this.uSetInputValue();
    };
  };
};
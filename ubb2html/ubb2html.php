<?php
function ubb2html($argContent)
{
  $tmpstr = '';
  $content = $argContent;
  if (!empty($content))
  {
    $regexAry = array();
    $content = htmlspecialchars($content);
    $content = str_replace('  ', '&nbsp; ', $content);
    $content = str_replace('  ', ' &nbsp;', $content);
    $content = preg_replace("/\[br\]/is", "<br />", $content);
    $regexAry[0] = array("\[p\]([^\[]*?)\[\/p\]", "<p>\\1</p>");
    $regexAry[1] = array("\[b\]([^\[]*?)\[\/b\]", "<b>\\1</b>");
    $regexAry[2] = array("\[i\]([^\[]*?)\[\/i\]", "<i>\\1</i>");
    $regexAry[3] = array("\[u\]([^\[]*?)\[\/u\]", "<u>\\1</u>");
    $regexAry[4] = array("\[h1\]([^\[]*?)\[\/h1\]", "<h1>\\1</h1>");
    $regexAry[5] = array("\[h2\]([^\[]*?)\[\/h2\]", "<h2>\\1</h2>");
    $regexAry[6] = array("\[ol\]([^\[]*?)\[\/ol\]", "<ol>\\1</ol>");
    $regexAry[7] = array("\[ul\]([^\[]*?)\[\/ul\]", "<ul>\\1</ul>");
    $regexAry[8] = array("\[li\]([^\[]*?)\[\/li\]", "<li>\\1</li>");
    $regexAry[9] = array("\[code=([^\]]*)\]([\s\S]*?)\[\/code\]", "<pre class=\"line-numbers\"><code class=\"\\1\">\\2</code></pre>");
    $regexAry[10] = array("\[quote\]([^\[]*?)\[\/quote\]", "<div class=\"ubb_quote\">\\1</div>");
    $regexAry[11] = array("\[color=([^\]]*)\]([^\[]*?)\[\/color\]", "<span style=\"color: \\1\">\\2</span>");
    $regexAry[12] = array("\[hilitecolor=([^\]]*)\]([^\[]*?)\[\/hilitecolor\]", "<span style=\"background-color: \\1\">\\2</span>");
    $regexAry[13] = array("\[align=([^\]]*)\]([^\[]*?)\[\/align\]", "<div style=\"text-align: \\1\">\\2</div>");
    $regexAry[14] = array("\[url=([^\]]*)\]([^\[]*?)\[\/url\]", "<a href=\"\\1\">\\2</a>");
    $regexAry[15] = array("\[img\]([^\[]*?)\[\/img\]", "<a href=\"\\1\" target=\"_blank\"><img src=\"\\1\" /></a>");
    $status = true;
    while($status)
    {
      $status = false;
      for ($ti = 0; $ti < count($regexAry); $ti ++)
      {
        $tnRegexString = "/" . $regexAry[$ti][0] . "/is";
        if (preg_match($tnRegexString, $content))
        {
          $status = true;
          $content = preg_replace($tnRegexString, $regexAry[$ti][1], $content);
        }
      }
    }
    $content = str_replace(current(json_decode('{"string": "\u2045"}', true)), '[', $content);
    $content = str_replace(current(json_decode('{"string": "\u2046"}', true)), ']', $content);
    $tmpstr = $content;
  }
  return $tmpstr;
}
?>
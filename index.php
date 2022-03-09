<?php

//サムネイルのサイズ　実寸は以下のマージンを引いたサイズ
$thumbs_w = 320;

//サムネイルのマージン
$thumbs_margin = 20;

//画像フォルダ&タイトル
$pic1 = 'job1'; $ttl1 = 'Sakura Takahashi';
$pic2 = ''; $ttl2 = '';

//ヘッダーテキスト
$hd_cmmnt = '<a href="https://saruwakakun.com/tools/png-jpeg-to-webp/" target="_blank" rel="noopener">WEBP</a>' . ' AND ANIMATION GIF ONLY';

//------------------ 設定ここまで ------------------//

//PIN.ディレクトリ (一時的対応)
if (isset($_SERVER['HTTPS']) AND $_SERVER['HTTPS'] == 'on') {
  $protocol = 'https://';
}
else {
  $protocol = 'http://';
}
$pin_dir =  $protocol . $_SERVER["HTTP_HOST"] . '/cmn/tool/pin/';

//パラメーター確認
$para1 =(!empty($_GET['type'])) ? htmlspecialchars($_GET['type']) : $pic1;
$para2 =(!empty($_GET['child'])) ? htmlspecialchars($_GET['child']) : '';

//ページタイトル
$pg_ttl = ($para1 == $pic1) ? $ttl1 : $ttl2;

//このページのパス
$pg_root = str_replace('index.php', '', $_SERVER['SCRIPT_NAME']);

//現在のディレクトリ取得
$current = dirname(__FILE__) . '/';

//ページリンク取得
$anchor_ar1 = (!empty($pic1)) ? get_cate_anchor_all($current, $pic1, $pg_root) : '';
$anchor_ar2 = (!empty($pic2)) ? get_cate_anchor_all($current, $pic2, $pg_root) : '';

if(!empty($anchor_ar1)){
  $anchor = strtoupper($ttl1) . '：[ ' . implode(' | ',$anchor_ar1) . ' ]';
  $anchor .=  (!empty($anchor_ar2))? '　'. $ttl2 . '：[ ' . implode(' | ',$anchor_ar2) . ' ]' : '';

  //画像ディレクトリパス
  $pics_path_root = $current . $para1 . '/';

  //ラベル
  $label_ar = scandir($pics_path_root);
  foreach($label_ar as $key => $val){
    if($val == '.' || $val == '..'){
      unset($label_ar[$key]);
    }
  }
}else{
  $anchor = '';
}

$i=0;
if(!empty($para2)){
  //画像 子ディレクトリ検索
  $pics_path_root = $current . $para1 . '/' . $para2 . '/';

  foreach(glob($pics_path_root . "*") as $val){
    $src = str_replace($current, '', $val);
    if(file_exists($src)){
      while($label_name = current($label_ar)){
        if(strstr($src,$label_name) !== false){
          $label_name2 = convert_namae($label_name);
          $label_class = ($label_name == 'website')? 'label_website' : 'label';
          $label = '<span class="' . $label_class . '">' . $label_name2 . '</span>';
          break;
        }else{
          next($label_ar);
        }
      }
      $ttl = str_replace($pics_path_root, '', $val);
      $ttl = (mb_strlen($ttl) > 30) ? mb_substr($ttl,0,30) . '...' : $ttl;
      $attr = get_ratiocal($src,($thumbs_w - $thumbs_margin),'css');

      if($label_name == 'website'){
        $filename = pathinfo($val,PATHINFO_FILENAME);
        $img_array[] = '<div class="card">' . $label . '<a href="//' . $filename . '" target="_blank" rel="noopener"><img class="item" src="' . $src . '" ' . $attr . '></a></div>';
      } else{
        $img_array[] = '<div class="card">' . $label . '<a href="' . $src . '" data-lightbox="group" data-title="' . $label_name2 . ' | ' . $ttl . '"><img class="item" src="' . $src . '" ' . $attr . '>/a></div>';
      }
    }
  }
}else{
  //画像 ルートディレクトリ検索
  foreach(glob($pics_path_root . "*") as $val){
    $pic_path_name_ar[] = $val . "/";
    $each_path[] = glob($val . "/*");
  }
  foreach($each_path as $key){
    foreach($key as $val){
      $current_dir = $pic_path_name_ar[$i];
          $src = str_replace($current, '', $val);
          if(file_exists($src)){
            while($label_name = current($label_ar)){
              if(strstr($src,$label_name) !== false){
                $label_name2 = convert_namae($label_name);
                $label_class = ($label_name == 'website')? 'label_website' : 'label';
                $label = '<span class="' . $label_class . '">' . $label_name2 . '</span>';
                break;
              }else{
                next($label_ar);
              }
            }
            $ttl = str_replace($current_dir, '', $val);
            $ttl = (mb_strlen($ttl) > 30) ? mb_substr($ttl,0,30) . '...' : $ttl;
            $attr = get_ratiocal($src,($thumbs_w - $thumbs_margin),'css');

            if($label_name == 'website'){
              $filename = pathinfo($val,PATHINFO_FILENAME);
              $img_array[] = '<div class="card">' . $label . '<a href="//' . $filename . '" target="_blank" rel="noopener"><img class="item" src="' . $src . '" ' . $attr . '></a></div>';
            } else{
              $img_array[] = '<div class="card">' . $label . '<a href="' . $src . '" data-lightbox="group" data-title="' . $label_name2 . ' | ' . $ttl . '"><img class="item" src="' . $src . '" ' . $attr . '></a></div>';
            }
          }
    }
    $i++;
  }
}

if(isset($img_array) && is_array($img_array)){
  shuffle($img_array);
  $images = implode("\n",$img_array);
}else{
  $images = 'サンプルはは有りません';
}

//--------- 関数 ---------//

//サムネ画像サイズを取得
function get_ratiocal($src='',$num_w=0,$attr='y'){
  if(!empty($src)){
    $imgsize = getimagesize($src);
    $num_y = $num_w * $imgsize[1] / $imgsize[0];
    switch($attr){
      case 'y':return 'width="' . $num_w . '" height="' . round($num_y) . '"'; break;
      case 'css':return 'style= "width:' . $num_w . 'px; height:' . round($num_y) . 'px;"'; break;
      default: return array($num_w,$num_y); break;
    }
  }else{
    return 0;
  }
}

//全てのリンクを取得
function get_cate_anchor_all($current='',$pic_dir='',$index='')
{
  if(!empty($pic_dir)){
    $dir_ar = scandir($current.'/'.$pic_dir.'/');

    foreach($dir_ar as $key => $val){
      if($val == '.' || $val == '..' || $val == '.DS_Store'){
        unset($dir_ar[$key]);
      }else{
        $anchor_txt = str_replace('-','&amp;',$val);
        $anchor_txt = str_replace('_',' ',$anchor_txt);
        $anchor_ar[] = '<a href="' . $index . '?type=' . $pic_dir . '&child=' . $val . '">' . strtoupper($anchor_txt) . '</a>';
      }
    }
    $anchor_ar[] = '<a href="' . $index . '?type=' . $pic_dir . '">' . strtoupper('all') . '</a>';
    return $anchor_ar;
  }else{
    return '';
  }
}

//ラベル
function convert_namae($name=''){
  if(!empty($name)){
    $name2 = strtoupper(str_replace('-','&amp;',$name));
    $name2 = strtoupper(str_replace('_',' ',$name2));
  }
  return $name2;
}

/*
参考資料
https://webdesignday.jp/inspiration/technique/css/4680/#i-6
*/
?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="robots" content="noindex,nofollow">
<link href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.7.1/css/lightbox.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script src="asset/js/jquery.onscreen.min.js"></script>
<script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
<script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>
<script src="asset/js/lightbox.js"></script>
<style>
  html{
    font-size: 62.5%;
  }
  body {
    background-color: #333;
    font-size: 1.4rem;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    font-family: "Helvetica Neue", Helvetica, Arial sans-serif;
    min-height: 100vh;
  }
  header {
    color: #fff;
    margin-bottom: 2rem;
    padding: .5rem;
    text-align: center;
    font-size: 1rem;
  }
  header a:link,
  header a:visited {
    color: #fff;
    text-decoration: underline;
  }
  header a:hover {
    text-decoration: none;
  }
  main {
    flex: 1;
    padding-bottom: 10rem;
  }
  footer {
    background-color: #111;
    align-content: flex-start;
    bottom: 0;
    color: #fff;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    opacity: .9;
    position: fixed;
    width: 100vw;
    /** 真ん中寄せ **/
    -webkit-justify-content: center;
  }
  .ft-item-name {
    background-color: #fff;
    color: #000;
    letter-spacing: .1rem;
    font-size: 2rem;
    font-weight: 900;
    padding: 1rem 1rem 1rem 1.5rem;
    /** 以下中央揃え**/
    display: -webkit-box;
    display: -ms-flexbox;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: center;
  }
  .ft-item-name a:link,
  .ft-item-name a:visited {
    color: #000;
    text-decoration: none;
  }
  .ft-item-menu {
    flex-grow: 1;
    font-size: 1rem;
    letter-spacing: .1rem;
    padding: 1rem 5rem 1rem 2rem;
    padding-right: 5rem;
    /** 以下中央揃え**/
    display: -webkit-box;
    display: -ms-flexbox;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: center;
  }
  .ft-item-menu a:link,
  .ft-item-menu a:visited {
    color: #fff;
    text-decoration: none;
  }
  .ft-item-menu a:hover {
    text-decoration: underline;
  }
  .container {
    margin: 0 auto;
  }
  .card {
    margin: 4px;
    padding: 6px;
    width: <?php echo ($thumbs_w - $thumbs_margin); ?>px;
    position: relative;
    /*onScreen*/
    opacity: 0;
    filter: alpha(opacity=0);
  }
  .label, .label_website {
    position: absolute;
    display: inline-block;
    padding: .5rem;
    top: 3rem;
    right: .4rem;
    font-size: .2rem;
    background-color: #545454;
    color: #fff;
    line-height: 1;
    letter-spacing: .05rem;
    opacity: 0.9;
    z-index: 100;
  }
  .label_website::after {
    content: "";
    display: inline-block;
    width: 7px;
    height: 7px;
    background: url(img/blank.png) no-repeat;
    background-size: contain;
    margin-left: 3px;
  }
  .item {
    width: 100%;
    border-radius: 10px;
    box-shadow: 2px 2px 3px rgba(0,0,0,0.4);
  }
  .item:hover {
    opacity: .7;
  }
  .page-top {
    position: fixed;
    bottom: 8vh;
    right: 3vh;
    font-size: 1.4rem;
    line-height: 1;
    z-index: 99;
  }
  .page-top a {
    background: #fff;
    text-decoration: none;
    color: #000;
    width: 60px;
    padding: 23px 0px;
    text-align: center;
    display: block;
    border-radius: 90px;
    opacity: 0.9;
    transition: all .3s ease;
    letter-spacing: .1rem;
  }
  .page-top a:hover {
    text-decoration: none;
    opacity: .5;
  }
  .flex{
    display: flex;
  }
</style>
<title>Pin.<?php echo ' | ' . $pg_ttl; ?></title>
</head>
<body>
    <header>
    <?php echo $hd_cmmnt; ?>
    </header>
    <main>
    <div class="container">
      <?php echo $images; ?>
    </div>
    <p class="page-top"><a href="#">TOP</a></p>
    </main>
    <footer class="footer">
        <div class="ft-item-name"><a href="/cmn/tool/pin/">Pin.</a></div>
        <div class="ft-item-menu"><?php echo $anchor; ?></div>
    </footer>
<script>
$(function(){
var $container = $('.container');
  $container.imagesLoaded(function(){
    $container.masonry({
    itemSelector: '.card',
    columnWidth: <?php echo $thumbs_w; ?>,
    isFitWidth: true,
    isAnimated: true,
    isResizeBound: true
  });
  $(function(){
    $(".card").onScreen({
      doIn: function(){
        $(this).animate({
        opacity: 1
      },800);
      },
      tolerance: 50
    });
  });
  });

  var pagetop = $('.page-top');
  pagetop.hide();
  $(window).scroll(function () {
     if ($(this).scrollTop() > 100) {
          pagetop.fadeIn();
     } else {
          pagetop.fadeOut();
     }
  });
  pagetop.click(function () {
     $('body, html').animate({ scrollTop: 0 }, 500);
     return false;
  });
});
</script>
</body>
</html>
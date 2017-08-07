<?php

class Fontbuild {
    static public $skipName = array('.','..','.svn');
    static public function buildDir($dir, $ext = null){
        $ext = $ext === null ? array('html','js'):$ext;
        $words = array();

        if ( is_dir ( $dir )) {
            if ( $dh  =  opendir ( $dir )) {
                while (( $file  =  readdir ( $dh )) !==  false ) {
                    if(in_array($file,self::$skipName) == false ){
                        $fullFile = "{$dir}/{$file}";
                        //if(is_dir($fullFile)){
                        //    self::buildDir($fullFile, $ext);
                        //}
                        if(is_file($fullFile)){
                            $path_parts  =  pathinfo ($fullFile);
                            $extension   = $path_parts['extension' ];
                            if(in_array($extension, $ext)){
                                $size = filesize($fullFile);
                                echo  "{$fullFile}  -  {$extension}  {$size} \n" ;
                                $txt = file_get_contents($fullFile);
                                $hanZ = self::getHanz($txt);
                                $words = array_merge($words, $hanZ);
                            }

                        }
                    }
                }
                 closedir ( $dh );
            }
        }
        $words = array_unique($words);
        return $words;
    }

    static public function getHanz($txt){
        $p = "/([0-9,a-z,A-Z,x{4e00}-\x{9fa5}])/u";
        preg_match_all($p, $txt, $rs);
        unset($rs[0]);
        $rs[1] = array_unique($rs[1]);
        return $rs[1];
    }
}

$hz = Fontbuild::buildDir('.');
$hz2 = Fontbuild::buildDir('./prod');
$hz = array_merge($hz2, $hz);
$hz = array_unique($hz);

$hz = implode('',$hz);
$html = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><script>var Token = (Date.now() + Math.random()) + "-";var download = function(){window.location.href="http://test2.cloud-top.com.cn/1608_mazda/font-download.php?down=" + Token;}</script><link rel="stylesheet" href="src/styles/common.css"><style>body{
    font-weight: normal;color: #FFF;}</style><script src="gsm1urt.js"></script><script>try{Typekit.load({async: true});} catch (e) {}</script>
</head><body>' . $hz . '<br><br><button disabled onclick="download()" id="downbt">下载字体</button><script>setTimeout(function(){downbt.disabled = false},5000);</script></body></html>';
file_put_contents('font-buld.html', $html);
//passthru('font-spider ./font-buld.html');

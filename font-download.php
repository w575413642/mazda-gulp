<?php
header('Access-Control-Allow-Origin:*');

if(empty($_GET['down'])){
    $url = $_SERVER['QUERY_STRING'];
    preg_match ("/\/([\d\.]+\-)/",$url, $token);
    preg_match ("/\/af\/([\dabcdef]{6})\//",$url,$type);
    $url = preg_replace("/\/[\d\.]+\-/",'',$url);
    //var_dump($type);
    //var_dump($token);
    $f1 = file_get_contents('https://fonts.typekit.net' . $url );
    echo $f1;
    
    @mkdir('./_font');
    @mkdir('./_font/' . $token[1]);
    file_put_contents("./_font/{$token[1]}/{$type[1]}",$f1);
}else{
    $token = $_GET['down'];
    //phpinfo();
    
    $zip=new ZipArchive();
    if($zip->open("./_font/{$token}/font.zip", ZipArchive::OVERWRITE)=== TRUE){
        addFileToZip("./_font/{$token}/", $zip); //调用方法，对要打包的根目录进行操作，并将ZipArchive的对象传递给方法
        $zip->close(); //关闭处理的zip文件
    }
    //header ( 'Content-type: application/zip' );
    //header ( 'Content-Disposition: attachment; filename="font.zip"' );
    //readfile("./_font/{$token}/font.zip");
}

function addFileToZip($path,$zip){
    $handler=opendir($path); //打开当前文件夹由$path指定。
    while(($filename=readdir($handler))!==false){
        if($filename != "." && $filename != ".." && $filename != 'font.zip'){//文件夹文件名字为'.'和‘..’，不要对他们进行操作
            if(is_dir($path."/".$filename)){// 如果读取的某个对象是文件夹，则递归
                addFileToZip($path."/".$filename, $zip);
            }else{ //将文件加入zip对象
                $finfo  =  finfo_open ( FILEINFO_MIME_TYPE );  // 返回 mime 类型
                //foreach ( glob ( "*" ) as  $filename ) {
                    $mime = finfo_file ( $finfo ,  $path."/".$filename ) ;
                //}
                finfo_close ( $finfo );
                $newFilename =  $filename . preg_replace("/.+\//",'.',$mime);
                //rename($path."/".$filename, $path."/".$newFilename);
                echo $path."/".$filename, ' - ', $path."/".$newFilename , ' - ' ,$mime, "\r\n";
                //$zip->addFile($path."/".$newFilename);
            }
        }
    }
    @closedir($path);
}


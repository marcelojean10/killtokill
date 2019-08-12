<?php
	$data = [
		'title' 		 =>  'Kill To Kill',
		'path_phaser'    =>  'assets/js/phaser.min.js',
		'path_game_min'  =>  '',
        'path_game'      =>  'assets/js/game'
	];

    
    // versão do projeto minificada ou não.
    if($data['path_game_min'] == ''){
        $data['path_game_min'] = $data['path_game_min'] . '.js';    
    }else{
        $data['path_game_min'] = 'min.js';
    }



echo "<pre>";
	print_r($data);
echo "</pre>";


?>
<!DOCTYPE html>
<html>
    <head>
        <title><?php echo $data['title']; ?></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="<?php echo $data['path_phaser']; ?>"></script>
    </head>
    <body>
        <script type="text/javascript" src="<?php echo $data['path_game'].$data['path_game_min']; ?>"></script>
    </body>
    
</html>

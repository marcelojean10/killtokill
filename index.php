<?php
	
$variavel = (isset($data['path_game_min'])) ? ".js" : ".min.js";

	$data = [
		'title' 		 => 'Kill To Kill',
		'path_phaser'    => 'assets/js/phaser.min.js',
		'path_game'      => 'assets/js/game'.$variavel,
		'path_game_min'  =>  'aa'

	];

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

    </body>
    <script type="text/javascript" src="<?php echo $data['path_game']; ?>"></script>
</html>

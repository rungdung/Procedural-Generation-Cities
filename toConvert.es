set md 400
{x 10}buildCity


rule buildCity md 2{
	{ }buildRing
	{ y 10 }buildCity
}

rule buildRing md 1{
	{ }buildPlot
	{ }blockBreak
}

	

rule buildPlot md 1{
	
	{ x 3 y 0.09 ry 1 }buildPlot 
	{ }blockBreak 
	{ s 3 4 0.4 } box buildTree
	{ z 2  s 3 4 1} buildType1  
}

rule buildPlot md 1{
	{ x 2 y 0.01 ry 2}buildPlot
	{ }blockBreak
	{  s 2  3 0.4 } box buildTree
	{ z 2 s 2 3 1} buildType2
}                                                                                                                                                                                                                                                                                                                                             

rule buildPlot md 1{
	{ z 10 x 2 ry 1}buildPlot
	{ }blockBreak
	{  s 2  3 0.4 } box
	{ z 2 s 2 3 1} buildType2
}      
rule buildPlot md 1{
	{ z -10 x 2 ry 1}buildPlot
	{ }blockBreak
	{s 2  3 0.4 } box
	{ z 2 s 2 3 1} buildType2
}  

rule buildPlot md 1{
	{ x 2 y -0.01 ry 1.2  }buildPlot
	{}blockBreak 
	{  s 2  3 0.4 } box buildTree
	{ z 2 s 2 3 1} buildType3
	}		


rule blockBreak md 1 {
	{x 2}blockBreak
}
rule blockBreak md 1 {
	{ x 1000 }blockBreak
}
rule blockBreak md 1{
	{ x 1000 }blockBreak
	}

rule buildType1 md 4 {   
	{z 2 } buildType1 
	{ s 1 1 2} box 
	{z 2 s 1.2 1.2 1 } box 
}

rule buildType1 md 2{   
	{z 2 } buildType1 
	{ s 1 1 2} box
	{z 2 s 0.3 1.1 1 } box 
}


rule buildType2 md 2 {
	{z 2 } buildType2
	{  s 1 1 2} box
}

rule buildType2 md 2 {
	{z 2 } buildType2
	{ s 1 1 2} box
}


rule buildType3 md 5 {
	{z 2 } buildType3
	{ s 1 1 2 } box
	{  s 1 1 1} box
}

rule buildType3 md 3{
	{z 2 } buildType3
	{ s 1 1 2 } box
	{s 1 1.4 1} box
}

rule buildType3 md 3{
	{z 2 } buildType3
	{ s 1 1 2 } box
	{ s 0.9 0.5 1.5} box
}


rule buildTree md 1{
	{ry 180 x 3 s 0.9  } R1
}

rule buildTree md 1{
	{ry 180 y 3 s 0.7 } R1
}

rule buildTree md 1{
	{ry 180 y -3 s 0.6 } R1
}

rule buildTree md 1{
	{ry 180 x -3 s 0.5 } R1
}

rule buildTree{
	placeholder	
}

rule R1 md 10 > endrule {
	{ z 1 ry 9  s 0.83  y 0.01 } R1
 	mesh
}

rule R1  md 1{
	{ z 1 ry 6   s 0.87 } R1
	{ rz 90  } R1
	mesh
}

rule R1  md 2 > endrule {
	{ z 1 ry 6   s 0.87  } R1
	{ rz 90  } R1
	mesh
}

rule endrule md 1 {
	{ s 5 } box
}

rule endrule md 1 {
	{ s 5 } sphere
}

rule endrule md 1 {
	{ s 5 } sphere
}
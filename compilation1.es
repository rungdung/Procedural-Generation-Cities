//compilation number 1
//light and raytracer
set raytracer::light [80,-90,100]

set raytracer::shadows true
set raytracer::reflection 0.2
set raytracer::phong [0.7,0.4,0.4]
set raytracer::samples 10
//set raytracer::dof [0.4,0.1] 
set raytracer::size [1000x1000]
set raytracer::max-depth 10



//macro city wide variables
#define ringNum 1 (int:0-100)
#define streetWidthScale 2
#define worldAngle 1

//plot sizes
#define classOnePlotX 2 (int:0-30)
#define classOnePlotY 2 (int:0-30)

#define classTwoPlotX 2 (int:0-30)
#define classTwoPlotY 2 (int:0-30)

#define classThreePlotX 2 (int:0-30)
#define classThreePlotY 2 (int:0-30)

#define classFourPlotX 2 (int:0-30)
#define classFourPlotY 2 (int:0-30)

//floorheights
#define floorHeightTypeOne 1 (int:0-40)
#define floorHeightTypeTwo 1 (int:0-40)
#define floorHeightTypeThree 1 (int:0-40)
#define floorHeightTypeFour 1 (int:0-40)

//treees
#define treeScale 1

set maxdepth 80000
set maxobjects 100000
{}buildCity

rule buildCity maxdepth ringNum{
	//{ y -classOnePlotY }buildStreet
	{}buildRing
	{ y 10 }buildCity
}

rule buildRing{
	{}buildPlot
	{}blockBreak
}


rule buildStreet maxdepth 400{
	{ x classOnePlotX ry worldAngle} buildStreet //move first
	{ s classOnePlotX streetWidthScale 0.2  color white} box //create box with no relation to prev instance
	//{ y classOnePlotY }buildPlot
	//{ y streetWidthScale}buildStreet
}
	
//plot generators
//---------------------------------------------------------------------------------------------------------------------
rule buildPlot{
	
	{ x classOnePlotX y 0.09 ry worldAngle }buildPlot //recurses after moving in specified dir
	{ }blockBreak 
	{ color white s classOnePlotX  classOnePlotY 0.4 } box buildTree//builds white plot
	{ z floorHeightTypeOne  s classOnePlotX classOnePlotY 1} buildType1  //builds building after scaling to plot size and height
}

rule buildPlot{
	{ x classTwoPlotX y 0.01 ry 2}buildPlot
	{  }blockBreak
	{ color grey s classTwoPlotX  classTwoPlotY 0.4 } box buildTree
	{ z floorHeightTypeTwo s classTwoPlotX classTwoPlotY 1} buildType2
}                                                                                                                                                                                                                                                                                                                                             
/*
rule buildPlot{
	{ z 10 x classTwoPlotX ry worldAngle}buildPlot
	{  }blockBreak
	{ color grey s classTwoPlotX  classTwoPlotY 0.4 } box
	{ z floorHeightTypeTwo s classTwoPlotX classTwoPlotY 1} buildType2
}      
rule buildPlot{
	{ z -10 x classTwoPlotX ry worldAngle}buildPlot
	{  }blockBreak
	{ color grey s classTwoPlotX  classTwoPlotY 0.4 } box
	{ z floorHeightTypeTwo s classTwoPlotX classTwoPlotY 1} buildType2
}  */ 

rule buildPlot{
	{ x classThreePlotX y -0.01 ry 1.2  }buildPlot
	{ }blockBreak 
	{ color white s classThreePlotX  classThreePlotY 0.4 } box buildTree
	{ z floorHeightTypeThree s classThreePlotX classThreePlotY 1} buildType3



	}		

//breaks between blocks
//---------------------------------------------------------------------------------------------------------------------
rule blockBreak md 1 {
	{x streetWidthScale}blockBreak
}
rule blockBreak md 1 {
	{ x 1000 }blockBreak
}
rule blockBreak md 1{
}




//buildtypes
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


//build type 1
//---------------------------------------------------------------------------------------------------------------------
rule buildType1 maxdepth 4 weight 0.7{   
	{z floorHeightTypeOne } buildType1 //recurse after moving
	{color red alpha 0.7 s 1 1 floorHeightTypeOne} box //build floor
	//facade
	{z floorHeightTypeOne s 1.2 1.2 1 color white} box //build floor top
}

rule buildType1 maxdepth 2{   
	{z floorHeightTypeOne } buildType1 //recurse after moving
	{color red alpha 0.7 s 1 1 floorHeightTypeOne} box //build floor
	//facade
	{z floorHeightTypeOne s 0.3 1.1 1 color white} box //build floor top
}

//build type 2
//Water Bodies
//---------------------------------------------------------------------------------------------------------------------
rule buildType2 maxdepth 2 weight 0.001{
	{z floorHeightTypeTwo } buildType2
	{ color blue alpha 0.4 s 1 1 floorHeightTypeTwo} box
}

rule buildType2 maxdepth 2 weight 0.001{
	{z floorHeightTypeTwo } buildType2
	{ blend blue 0.1  alpha 0.4 s 1 1 floorHeightTypeTwo} box
}


//build type 3
//---------------------------------------------------------------------------------------------------------------------
rule buildType3 maxdepth 5 weight 0.5{
	{z floorHeightTypeThree } buildType3
	{ color green alpha 0.4 s 1 1 floorHeightTypeThree } box
	//facade
		//windows 
	{ color grey s 1 1 1} box
}

rule buildType3 maxdepth 3{
	{z floorHeightTypeThree } buildType3
	{ color green alpha 0.7 s 1 1 floorHeightTypeThree } box
	//facade
		//windows 
	{ color white s 1 1.4 1} box
}

rule buildType3 maxdepth 3{
	{z floorHeightTypeThree } buildType3
	{ color green s 1 1 floorHeightTypeThree } box
	//facade
		//windows 
	{ color white s 0.9 0.5 1.5} box
}

//trees and greenery
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------


rule buildTree md 1{
	{ry 180 x 3 s 0.9  } R1
}

rule buildTree md 1{
	{ry 180 y 3 s 0.7 } R1
}

rule buildTree md 1{
	{ry 180 y -3 s 0.6 } R1
}

rule buildTree {
	{ry 180 x -3 s 0.5 } R1
}

rule buildTree{
}

rule R1 maxdepth 10 > endrule {
	{ z 1 ry 9   s 0.83  color brown y 0.01 } R1
 	mesh
}

rule R1 w 0.25 {
	{ z 1 ry 6   s 0.87  color green} R1
	{ rz 90  } R1
	mesh
}

rule R1 w 0.25 md 2 > endrule{
	{ z 1 ry 6   s 0.87  color green} R1
	{ rz 90  } R1
	mesh
}

rule endrule {
	{ s 5 color green} box
}

rule endrule {
	{ s 5 color green} sphere
}

rule endrule {
	{ s 5 hue 56 } sphere
}
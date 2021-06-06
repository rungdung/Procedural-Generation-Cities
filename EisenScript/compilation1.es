//compilation number 1
//light and raytracer
set raytracer::light [80,-10,100]

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
#define worldAngle 2

//plot sizes
#define classOnePlotX 6 (int:0-30)
#define classOnePlotY 8 (int:0-30)

#define classTwoPlotX 6 (int:0-30)
#define classTwoPlotY 7 (int:0-30)

#define classThreePlotX 5 (int:0-30)
#define classThreePlotY 3 (int:0-30)

#define classFourPlotX 2 (int:0-30)
#define classFourPlotY 2 (int:0-30)

//floorheights
#define floorHeightTypeOne 1 (int:0-40)
#define floorHeightTypeTwo 1 (int:0-40)
#define floorHeightTypeThree 1 (int:0-40)
#define floorHeightTypeFour 1 (int:0-40)

//utlity
#define DistUtilityLines 5

//treees
#define treeScale 1

//color reference
set colorpool image:C:\Users\adhav\Documents\StructureSynth\City\Scripts\Procedural-Generation---Cities-\EisenScript\ColorReference\colorSampleTaipei.png

set maxdepth 80000
set maxobjects 50000
{}buildCity

rule buildCity maxdepth ringNum{
	{}buildRing
	{ y 10 }buildCity
}

rule buildRing{
	{}buildPlot
}

	
//plot generators
//---------------------------------------------------------------------------------------------------------------------

//rule buildPlot{
	//{ x [x length of plot to move forward] y [distance to move on y axis, zig zag] x [distance between plots] ry [angle to curve] } buildPlot  //recurses after moving in specified dir
	//{ color [color of plot] s [scale to x size of plot] [scale to y size of plot] [thickness of plot] } box buildTree//builds white plot
	//{ z [move up from the base of the plot]  s [scale x] [scale z] [height of  floor already assigned in buildType fun]} buildType1  //builds building after scaling to plot size and height}

//Build Plot Type 1
rule buildPlot w 0.09{  
	{ x classOnePlotX y 0.17 x 1 ry worldAngle } buildPlot
	{ y DistUtilityLines } buildUtilityType1 
	{ color white s classOnePlotX  classOnePlotY 0.4 } box buildTree
	{ z floorHeightTypeOne  s classOnePlotX classOnePlotY 1} buildType1 
}
rule buildPlot w 0.09{
	{ x classOnePlotX y 0.12 ry worldAngle } buildPlot  
	{ y DistUtilityLines }buildUtilityType1 
	{ color white s classOnePlotX  classOnePlotY 0.4 } box buildTree
	{ z floorHeightTypeOne  s classOnePlotX classOnePlotY 1} buildType1
}

//Build Plot Type 2 Water Bodies
rule buildPlot w 0.1{
	{ x classTwoPlotX y 0.11 x 0.5 ry 2} buildPlot 
	{ y DistUtilityLines }buildUtilityType2 
	{ color white s classTwoPlotX  classTwoPlotY 0.4 } box buildTree
	{ z floorHeightTypeTwo s classTwoPlotX classTwoPlotY 1} buildType2
}                                                                                                                               
rule buildPlot w 0.1{
	{ x classTwoPlotX y 0.08 x 0.2 ry 2} buildPlot 
	{ y DistUtilityLines }buildUtilityType2 
	{ color white s classTwoPlotX  classTwoPlotY 0.4 } box buildTree
	{ z floorHeightTypeTwo s classTwoPlotX classTwoPlotY 1} buildType2
}        
rule buildPlot w 0.1{
	{ x classTwoPlotX y 0.05 ry 2} buildPlot 
	{ y DistUtilityLines }buildUtilityType2 
	{ color white s classTwoPlotX  classTwoPlotY 0.4 } box buildTree
	{ z floorHeightTypeTwo s classTwoPlotX classTwoPlotY 1} buildType2
	}        

//Build Plot Type 3
rule buildPlot w 0.09{
	{ x classThreePlotX y -0.01 x 0.1 ry 1.2 } buildPlot 
	{ y DistUtilityLines }buildUtilityType3 
	{ color white s classThreePlotX  classThreePlotY 0.4 } box buildTree
	{ z floorHeightTypeThree s classThreePlotX classThreePlotY 1} buildType3
	}		
rule buildPlot w 0.09{
	{ x classThreePlotX y -0.01 ry 1.2 } buildPlot 
	{ y DistUtilityLines }buildUtilityType3 
	{ color white s classThreePlotX  classThreePlotY 0.4 } box buildTree
	{ z floorHeightTypeThree s classThreePlotX classThreePlotY 1} buildType3
	}		


//buildtypes
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


//build type 1
//---------------------------------------------------------------------------------------------------------------------
rule buildType1 weight 0.7 maxdepth 2 > type1EndRule{
	{ z floorHeightTypeOne } buildType1 //recurse after moving
	{ color red  s 1 1 floorHeightTypeOne} box //build floor
	//facade
	{}type1Facade
}
rule buildType1 maxdepth 2 > type1EndRule{   
	{ z floorHeightTypeOne } buildType1 //recurse after moving
	{ color red  s 1 1 floorHeightTypeOne} box //build floor
	//facade
}
rule type1EndRule md 5{
	{ z 5 s 0.9 0.2 0.8 color red } box//build floor top
	{ z 0.9 }type1EndRule
}
rule type1EndRule md 5{
	{ z 5 s 0.9 0.2 0.8 color red } box//build floor top
	{ z 0.9 }type1EndRule
}

rule type1Facade w 0.1 md 10 {
	{ z 0.1 s 0.4 1.1 0.8 color red } box
	{ z 0.4 s 1.01 1.01 1} type1Facade
}
rule type1Facade w 0.2 md 15 {
	{ y 0.1 z 0.1 s 0.4 1.1 0.8 color red } box
	{ z 0.4 s 0.87 0.98 1} type1Facade
}
rule type1Facade w 0.1 md 20 {
	{ x 0.1 z 0.1 s 0.4 1.1 0.8 color red } box
	{ z 0.4 s 0.87 0.98 0.8} type1Facade
}

//build type 2
//Water Bodies
//---------------------------------------------------------------------------------------------------------------------
rule buildType2 maxdepth 2 weight 0.001{
	{ z floorHeightTypeTwo } buildType2
	{ color blue  s 1 1 floorHeightTypeTwo} box
}
rule buildType2 maxdepth 2 weight 0.001{
	{ z floorHeightTypeTwo } buildType2
	{ color blue s 1 1 floorHeightTypeTwo} box
}

//build type 3
//---------------------------------------------------------------------------------------------------------------------
rule buildType3 maxdepth 5 weight 0.5{
	{ z floorHeightTypeThree } buildType3
	{ color yellow  s 1 1 floorHeightTypeThree } box
	//facade
		//windows 
	{}type3Facade
}
rule buildType3 maxdepth 3{
	{ z floorHeightTypeThree } buildType3
	{ color yellow  s 1 1 floorHeightTypeThree } box
	//facade
		//windows 
	{}type3Facade
}
rule buildType3 maxdepth 3{
	{ z floorHeightTypeThree } buildType3
	{ color yellow s 1 1 floorHeightTypeThree } box
	//facade
		//windows 
	{}type3Facade
}

//Type 3 Facades
rule type3EndRule md 5{
	{ z 5 s 0.9 0.2 0.8 color yellow } mesh//build floor top
	{ z 0.9 }type3EndRule
}
rule type3EndRule md 5{
	{ z 5 s 0.9 0.2 0.8 color blue } box//build floor top
	{ z 0.9 }type3EndRule
}

rule type3Facade md 10 {
	{ color yellow s 0.7 1.4 1} box
}
rule type3Facade md 15 {
	{ z 0.1 color yellow s 1 1.4 0.5} box
}
rule type3Facade w 0.1 md 20{
	{ y 0.1 color yellow s 1 0.2 1} box
}

//Build Utlity
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
rule buildUtilityType1{
	{ s 0.7 4 1 color violet}box
	{}buildUtilityLineType1
	{ y 3 }buildUtilityStation
}
rule buildUtilityType2{
	{s 0.7 4 1 color violet}box
	{}buildUtilityLineType2
	{ y 3 }buildUtilityStation
}
rule buildUtilityType3{
	{s 0.7 4 1 color violet}box
	{}buildUtilityLineType3
	{ y 3 }buildUtilityStation
}

rule buildUtilityLineType1 md 4{
	{y 0.5}buildUtilityLineType1
	{color grey s 7  0.4 0.4}box
}
rule buildUtilityLineType2 md 4{
	{y 0.5}buildUtilityLineType2
	{color grey s 7  0.4 0.4}box
}
rule buildUtilityLineType3 md 4{
	{y 0.5}buildUtilityLineType3
	{color grey s 7 0.4 0.4}box
}
rule buildUtilityStation w 9{

}
rule buildUtilityStation w 2{
	{ s 4 z 0.1 color grey  } box
}

//trees and greenery
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------

rule buildTree {
	{ z -0.5 s 6 6 0.7 color green }box
	{ rx 180 s 0.9 x 2 y 3 } R1
	{ x 5}buildTree
}
rule buildTree {
	{ z -0.5 s 6 6 0.7 color green }box
	{ rx 180 s 0.9 x 1 y -2 } R1
}
rule buildTree {
	{ z -0.5 s 6 6 0.2 color green}box
	{ rx 180 s 0.8 x 0.4 y -2 } R1
}
rule buildTree{
	{ z -0.5 s 6 6 0.2 color green}box
	{ rx 180 s 0.8  } R1
}
rule buildTree{
	{ z -0.5 s 6 6 0.2 color green }box
	{ rx 160 s 0.8  } R1
}
rule buildTree{
	{ z -0.5 s 6 6 0.2 color green}box
	{ rx 190 ry 56 s 0.8  } R1
}

//-----------------------------------------------------------------------------------
rule R1 w 0.4 maxdepth 3 > endrule {
	{ z 1 y 0.4  s 0.93  color brown } R1
 	mesh
}
rule R1 w 0.2 {
	{ z 1 y 0.4  s 0.95  color green} R1
	{  } R1
	mesh
}

rule R1 w 0.25 {
	{ z 1 x 0.5  s 0.88 color brown } R1
 	mesh
}
rule R1 w 0.25 md 1 > endrule{
	{ z 1  x 0.3 s 0.95  color green} R1
	{  } R1
	mesh
}
//-----------------------------------------------------------------------------------
rule endrule {
	{ s 5 color green } box
}

rule endrule {
	{ s 4 color green } sphere
}
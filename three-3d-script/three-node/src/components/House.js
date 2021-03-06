const WallClass = require('./WallClass')
const WallClass3D_In = require('./WallClass3D_In')
const WallClass3D_Out = require('./WallClass3D_Out')
const WallClass3D_Out = require('./WallClass3D_Out')
const WallLineClass = require('./WallLineClass')
const CeilingClass = require('./CeilingClass')
const DecalClass = require('./DecalClass')
const FloorClass = require('./FloorClass')
const WindowClass = require('./WindowClass')
const DoorClass = require('./DoorClass')
const FurnitureClass = require('./FurnitureClass')
const PlaneLightClass = require('./PlaneLightClass')
const TextClass = require('./TextClass')
const AIRoomClass = require('./AIRoomClass')
const ObjGroupClass = require('./ObjGroupClass')
const GroundClass = require('./GroundClass')
const Wiring3DClass = require('./Wiring3DClass')
const Trench3DClass = require('./Trench3DClass')
const FlueClass = require('./FlueClass')
const PillarClass = require('./PillarClass')
const LiangClass = require('./LiangClass')
const CameraList = require('./CameraList')
const WallboardClass = require('./WallboardClass')
const CeilingParamClass = require('./CeilingParamClass')
const FloorParamClass = require('./FloorParamClass')
const CeLiangClass = require('./CeLiangClass')
const SvgClass = require('./SvgClass')
const CADClass = require('./CADClass')
const ExportCad = require('./ExportCad')
const ImportCad = require('./ImportCad')
const ObjCtrl = require('./ObjCtrl')
const RulerClass = require('./RulerClass')



/**
 * @api HouseClass
 * @apiGroup HouseClass
 * @apiName  0
 * @apiDescription 房间类
 * @apiParam (成员变量) mWallClass 墙体类
 * @apiParam (成员变量) mWallClass3D_In  	  3D内墙类
 * @apiParam (成员变量) mWallClass3D_Out 	  3D外墙类
 * @apiParam (成员变量) mWallClass3D_Out_Room  施工图地面Mesh
 * @apiParam (成员变量) m_strCADXML  		  CAD的XML文件
 * @apiParam (成员变量) mWallLineClass 		  CAD方式绘制墙体
 * @apiParam (成员变量) mDoorClass  			    门类
 * @apiParam (成员变量) mWindowClass 窗类
 * @apiParam (成员变量) mFloorClass  地面类
 * @apiParam (成员变量) mTextClass   文字类
 * @apiParam (成员变量) mText3DClass 立体字
 * @apiParam (成员变量) mWallboardClass    墙板类
 * @apiParam (成员变量) mCeilingParamClass 吊顶参数化
 * @apiParam (成员变量) mFurnitureClass   家具类
 * @apiParam (成员变量) mFloorParamClass  参数化地面
 * @apiParam (成员变量) mPlaneLightClass  片灯
 * @apiParam (成员变量) mWardrobeClass  衣柜
 * @apiParam (成员变量) mCeilingClass   吊顶类
 * @apiParam (成员变量) mDecalClass     贴花材质
 * @apiParam (成员变量) mWallTop        墙体顶厚
 * @apiParam (成员变量) mRoomClass      房间类
 * @apiParam (成员变量) mImportCad      导入cad
 * @apiParam (成员变量) mExportCad      导出cad
 * @apiParam (成员变量) mAIRoomClass    AI一键布置
 * @apiParam (成员变量) mGroupClass     动态成组
 * @apiParam (成员变量) mGroundClass    地面组
 * @apiParam (成员变量) mWiring3DClass  3D布线
 * @apiParam (成员变量) mCameraList     相机列表
 * @apiParam (成员变量) mFlueClass      烟道
 * @apiParam (成员变量) mPillarClass    柱子
 * @apiParam (成员变量) mLiangClass     梁
 * @apiParam (成员变量) mCeLiangClass   平面上测量
 * @apiParam (成员变量) mSvgClass       SVG
 * @apiParam (成员变量) mObjCtrl        控制物体
 * @apiParam (成员变量) mFont     	       字体
 * @apiParam (成员变量) mRenderFloor    
 * @apiParam (成员变量) mRenderWall_In  
 * @apiParam (成员变量) mRenderWall_Out  
 * @apiParam (成员变量) mRenderCeilingTop  
 * @apiParam (成员变量) mRenderCeilingTop_Room  
 * @apiParam (成员变量) mRenderWallTop  墙顶面
 * @apiParam (成员变量) mRenderCeiling  
 * @apiParam (成员变量) m_OBBox_Max     户型包围盒max
 * @apiParam (成员变量) m_OBBox_Min     户型包围盒min
 * @apiParam (成员变量) m_fHeight   房屋层高
 * @apiParam (成员变量) m_fontLoaded  
 * @apiParam (成员变量) mHistory 撤销恢复
 */
module.exports = function HouseClass() {
  //一层户型
  this.mWallClass;		// 墙体类
  this.mWallClass3D_In;	// 3D内墙类
  this.mWallClass3D_Out;	// 3D外墙类
  this.mWallClass3D_Out_Room;	// 单房间外墙
  //this.mCeiling3D;      //顶面类
  this.m_strCADXML = null;// CAD的XML文件
  this.mWallLineClass;	// CAD方式绘制墙体
  this.mCameraList;		// 3D相机列表
  this.mDoorClass;		// 门类
  this.mWindowClass;		// 窗类
  this.mFloorClass;   	// 地面类
  this.mTextClass;
  this.mText3DClass;		// 立体字
  this.mWallboardClass;	// 墙板类
  this.mCeilingParamClass;// 参数化吊顶
  this.mFloorParamClass  	// 参数化地面
  this.mFurnitureClass;	// 家具
  this.mPlaneLightClass;  // 光源
  this.mWardrobeClass;	// 衣柜
  this.mCeilingClass; 	// 吊顶类
  this.mDecalClass;		// 贴花材质
  this.mWallTop;			// 墙体顶厚
  this.mRoomClass;		// 房间类
  this.mImportCad;        // 导入cad
  this.mExportCad;        // 导出cad
  this.mAIRoomClass;		// AI一键布置

  this.mGroupClass;		// 动态成组
  this.mGroundClass;		// 地面组
  this.mWiring3DClass;
  this.mTrench3DClass;	// 挖坑
  this.mFlueClass;		// 烟道
  this.mPillarClass;		// 柱子
  this.mLiangClass;		// 梁
  this.mCeLiangClass;		// 平面上测量
  this.mSvgClass;			// SVG
  this.mCADClass;			// CAD图标插件
  this.mObjCtrl;			// 控制物体
  this.mFont;
  this.mRenderFloor = new Array();
  this.mRenderWall_In = new Array();
  this.mRenderWall_Out = new Array();
  this.mRenderCeilingTop = new Array();
  this.mRenderCeilingTop_Room = new Array();
  this.mRenderWallTop;
  this.mRenderCeiling = new Array();

  this.m_OBBox_Max = new THREE.Vector3();		// 户型包围盒
  this.m_OBBox_Min = new THREE.Vector3();

  this.m_fHeight = 280; 	// 房屋层高
  this.m_fontLoaded = false;
  this.mHistory = new History();	// 撤销恢复
  //-------------------------
  this.mRenderFloor = new Array();
  this.mRenderWall_In = new Array();
  this.mRenderCeilingTop = new Array();
  this.mRenderCeiling = new Array();
  this.mRenderWall_Out = new Array();
  this.mDoorArray = new Array();
  this.mWindowArray = new Array();
  this.mFurnitureArray = new Array();
  this.mPlaneLightArray = new Array();
  this.mHideObjArray = new Array();		// 隐藏的模型
  this.mCustomMessArray = new Array();
  this.m_BOX = new THREE.Box3();
  this.mConfigurationFile = new Map(); //后台设置默认显示的门、窗户，前端根据后台设置显示对应门、窗户(结构:[名称,路径])
  //-----------------------------------------

  /**
   * @api OnInit()
   * @apiGroup HouseClass 
   * @apiName  0
   * @apiDescription 初始化房子类
   */
  this.OnInit = function () {
    this.OnLoadDoorAndWindowXML();

    this.mWallClass = new WallClass();			// 墙体类
    this.mWallClass.OnInit();

    this.mWallClass3D_In = new WallClass3D_In();		// 内墙类
    this.mWallClass3D_Out = new WallClass3D_Out();	// 外墙类
    this.mWallClass3D_Out_Room = new WallClass3D_Out();//单房间外墙


    this.mWallLineClass = new WallLineClass();
    this.mWallLineClass.OnInit();

    this.mCeilingClass = new CeilingClass(); 	// 顶类
    this.mDecalClass = new DecalClass();		// 贴花材质
    //this.mCeiling3D.OnInit();

    this.mFloorClass = new FloorClass();		// 地面类
    this.mFloorClass.OnInit();

    this.mWindowClass = new WindowClass();	// 窗户类包含窗户所有操作
    this.mWindowClass.OnInit();
    this.mDoorClass = new DoorClass();
    this.mDoorClass.OnInit();

    this.mFurnitureClass = new FurnitureClass();	//模型加载
    this.mFurnitureClass.OnInit();

    this.mPlaneLightClass = new PlaneLightClass();

    this.mTextClass = new TextClass();
    this.mText3DClass = new Text3DClass();

    this.mAIRoomClass = new AIRoomClass();
    this.mRoomClass = new RoomClass();

    this.mGroupClass = new ObjGroupClass();
    this.mGroupClass.OnInit();

    this.mGroundClass = new GroundClass();

    this.mWiring3DClass = new Wiring3DClass();
    this.mWiring3DClass.OnInit();

    this.mTrench3DClass = new Trench3DClass();
    this.mTrench3DClass.OnInit();

    this.mFlueClass = new FlueClass();	//烟道
    this.mFlueClass.OnInit();

    this.mPillarClass = new PillarClass();	//柱子
    this.mPillarClass.OnInit();

    this.mLiangClass = new LiangClass();	//梁
    this.mLiangClass.OnInit();

    this.mCameraList = new CameraList();		// 相机列表

    this.mWallboardClass = new WallboardClass();
    this.mWallboardClass.OnInit();

    this.mCeilingParamClass = new CeilingParamClass();
    this.mFloorParamClass = new FloorParamClass();
    this.mCeLiangClass = new CeLiangClass();	// 测量

    this.mSvgClass = new SvgClass();	// Svg
    this.mSvgClass.OnInit();

    this.mCADClass = new CADClass();
    this.mCADClass.OnInit();

    this.mExportCad = new ExportCad();

    this.mImportCad = new ImportCad();

    this.mObjCtrl = new ObjCtrl();		// 操控物体
    this.mObjCtrl.OnInit();

    this.mRulerClass = new RulerClass();
    this.mRulerClass.OnInit();
    /*
        this.mTextureClass   = new TextureClass();
        this.mWardrobeClass  = new WardrobeClass();
        this.mWardrobeClass.OnInit();
        */

    var loader = new THREE.FontLoader();
    //  loader.load( 'js/fonts/helvetiker_regular.typeface.json', function ( font ) {
    loader.load(m_strHttp + 'fonts/FZLanTingHeiS-DB-GB_Regular.xml', function (font) {
      mHouseClass.mFont = font;
      mHouseClass.m_fontLoaded = true;
    });

  };

  /**
   * @api OnLoadDoorAndWindowXML()
   * @apiGroup HouseClass 
   * @apiName  0
   * @apiDescription 加载 门、窗户配置
   */
  this.OnLoadDoorAndWindowXML = function () {
    let xmlAddr = m_strWebService + 'iHouse/system/DoorAndWindow.xml?' + new Date().getTime();

    $.ajax({
      url: xmlAddr,
      dataType: 'text',
      type: 'GET',
      async: false,
      timeout: 1000,
      success: function (xml) {
        let $xmlDoc = $($.parseXML(xml));
        $xmlDoc.find("item").each(function (j) {
          let modelName = $(this).attr('name');
          let modelAddr = $(this).attr('file');

          mHouseClass.mConfigurationFile.set(modelName, modelAddr);
          mResource.InitFloor();
        });
      },
      error: function (xml) {
        console.log(xml);
      }
    });
  }

  this.BuildCeiling3D = function (solution_paths, iMaxAreaFloor) {
    for (i = 0; i < solution_paths.length; i++) {
      if (i == iMaxAreaFloor)
        continue;
      var tFloor = [];
      for (j = 0; j < solution_paths[i].length; j++) {
        tFloor.push(new poly2tri.Point(solution_paths[i][j].X, solution_paths[i][j].Y));
      }
      var swctx = new poly2tri.SweepContext(tFloor);
      swctx.triangulate();

      var triangles = swctx.getTriangles();

      var fw = 200 / (this.m_OBBox_Max.x - this.m_OBBox_Min.x);
      var fh = 200 / (this.m_OBBox_Max.y - this.m_OBBox_Min.y);
      var geom = new THREE.Geometry();
      for (var k = 0; k < triangles.length; k++) {
        geom.vertices.push(new THREE.Vector3(triangles[k].points_[0].x, triangles[k].points_[0].y, this.m_fHeight));
        geom.vertices.push(new THREE.Vector3(triangles[k].points_[2].x, triangles[k].points_[2].y, this.m_fHeight));
        geom.vertices.push(new THREE.Vector3(triangles[k].points_[1].x, triangles[k].points_[1].y, this.m_fHeight));

        geom.faces.push(new THREE.Face3(3 * k + 0, 3 * k + 1, 3 * k + 2));

        geom.faceVertexUvs[0][k] = [
          new THREE.Vector2((triangles[k].points_[0].x - this.m_OBBox_Min.x) / fw, (triangles[k].points_[0].y - this.m_OBBox_Min.y) / fh),
          new THREE.Vector2((triangles[k].points_[2].x - this.m_OBBox_Min.x) / fw, (triangles[k].points_[2].y - this.m_OBBox_Min.y) / fh),
          new THREE.Vector2((triangles[k].points_[1].x - this.m_OBBox_Min.x) / fw, (triangles[k].points_[1].y - this.m_OBBox_Min.y) / fh)];
      }
      //		  geom.faceVertexUvs[0][0] = [ new THREE.Vector2(0, 0),new THREE.Vector2(0, 100), new THREE.Vector2(100, 0)];
      //      geom.faceVertexUvs[0][1] = [ new THREE.Vector2(0, 100), new THREE.Vector2(100, 100),new THREE.Vector2(100, 0)];

      geom.computeFaceNormals();
      geom.verticesNeedUpdate = true;
      geom.uvsNeedUpdate = true;

      //	var mesh = new THREE.Mesh( geom, new THREE.MeshPhongMaterial( { side: THREE.FrontSide, map: mResource.mCeilingTex } ) );
      var tMat = new THREE.MeshPhysicalMaterial({
        map: mResource.mCeilingTex,
      });
      mesh = new THREE.Mesh(geom, tMat);
      mesh.rotation.x = -Math.PI / 2;
      scene3D.add(mesh);
      this.mRenderCeiling.push(mesh);
    }
  };

  this.ChangeEmptyRoom = function () {
    var tMat = new THREE.MeshBasicMaterial({
      side: THREE.FrontSide,
      color: 0x333333,
    });
    for (k = 0; k < this.mRenderCeiling.length; k++) {
      this.mRenderCeiling[k].material = tMat;
      this.mRenderCeiling[k].material.needsUpdate = true;
    }

    for (var i = 0; i < this.mFurnitureClass.mFurnitureArray.length; i++) {
      this.mFurnitureClass.mFurnitureArray[i].OnShow(false);
    }
  };



  // 墙顶厚度
  this.BuildWallTop2D = function (solution_paths, iMaxAreaFloor) {
    var tFloor = [];
    for (j = 0; j < solution_paths[iMaxAreaFloor].length; j++)
      tFloor.push(new poly2tri.Point(solution_paths[iMaxAreaFloor][j].X, solution_paths[iMaxAreaFloor][j].Y));
    var swctx = new poly2tri.SweepContext(tFloor);

    for (i = 0; i < solution_paths.length; i++) {
      if (i == iMaxAreaFloor)
        continue;
      var hole = [];
      for (j = 0; j < solution_paths[i].length; j++) {
        hole.push(new poly2tri.Point(solution_paths[i][j].X, solution_paths[i][j].Y));
      }
      swctx.addHole(hole);
    }

    try {
      swctx.triangulate();
    } catch (ex) {
      alert("墙体顶面没生产,请确认墙体闭合!");
      return;
    }
    var triangles = swctx.getTriangles();

    var fw = 200 / (this.m_OBBox_Max.x - this.m_OBBox_Min.x);
    var fh = 200 / (this.m_OBBox_Max.y - this.m_OBBox_Min.y);
    var geom = new THREE.Geometry();
    for (var k = 0; k < triangles.length; k++) {
      geom.vertices.push(new THREE.Vector3(triangles[k].points_[0].x, triangles[k].points_[0].y, -0.1));
      geom.vertices.push(new THREE.Vector3(triangles[k].points_[1].x, triangles[k].points_[1].y, -0.1));
      geom.vertices.push(new THREE.Vector3(triangles[k].points_[2].x, triangles[k].points_[2].y, -0.1));
      geom.faces.push(new THREE.Face3(3 * k + 0, 3 * k + 1, 3 * k + 2));

      geom.faceVertexUvs[0][k] = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 0)];
    }
    geom.computeFaceNormals();
    geom.verticesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    var mesh = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, opacity: 1, transparent: true, color: 0xAAAAAA }));
    //	mesh.rotation.x = -Math.PI/2;
    scene.add(mesh);
    this.mRenderWallTop = mesh;
  };

  this.BuildCeilingTop = function (solution_paths, iMaxAreaFloor) {

    try {
      var tFloor = [];
      for (j = 0; j < solution_paths[iMaxAreaFloor].length; j++)
        tFloor.push(new poly2tri.Point(solution_paths[iMaxAreaFloor][j].X, solution_paths[iMaxAreaFloor][j].Y));

      var swctx = new poly2tri.SweepContext(tFloor);
      //===========================================================
      for (i = 0; i < solution_paths.length; i++) {
        if (i == iMaxAreaFloor)
          continue;
        var hole = [];
        for (j = 0; j < solution_paths[i].length; j++) {
          hole.push(new poly2tri.Point(solution_paths[i][j].X, solution_paths[i][j].Y));
        }
        swctx.addHole(hole);
      }

      swctx.triangulate();
      var triangles = swctx.getTriangles();

      var fw = 200 / (this.m_OBBox_Max.x - this.m_OBBox_Min.x);
      var fh = 200 / (this.m_OBBox_Max.y - this.m_OBBox_Min.y);
      var geom = new THREE.Geometry();
      for (var k = 0; k < triangles.length; k++) {
        geom.vertices.push(new THREE.Vector3(triangles[k].points_[0].x, triangles[k].points_[0].y, this.m_fHeight));
        geom.vertices.push(new THREE.Vector3(triangles[k].points_[1].x, triangles[k].points_[1].y, this.m_fHeight));
        geom.vertices.push(new THREE.Vector3(triangles[k].points_[2].x, triangles[k].points_[2].y, this.m_fHeight));

        geom.faces.push(new THREE.Face3(3 * k + 0, 3 * k + 1, 3 * k + 2));

        /*        	geom.faceVertexUvs[0][k] = [
                            new THREE.Vector2((triangles[k].points_[0].x - this.m_OBBox_Min.x)/fw, (triangles[k].points_[0].y - this.m_OBBox_Min.y)/fh),
                            new THREE.Vector2((triangles[k].points_[1].x - this.m_OBBox_Min.x)/fw, (triangles[k].points_[1].y - this.m_OBBox_Min.y)/fh),
                            new THREE.Vector2((triangles[k].points_[2].x - this.m_OBBox_Min.x)/fw, (triangles[k].points_[2].y - this.m_OBBox_Min.y)/fh)];*/

        geom.faceVertexUvs[0][k] = [
          new THREE.Vector2(0, 0),
          new THREE.Vector2(0, 0),
          new THREE.Vector2(0, 0)];
      }


      geom.computeFaceNormals();
      geom.verticesNeedUpdate = true;
      geom.uvsNeedUpdate = true;

      var mesh = new THREE.Mesh(geom, new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, opacity: 1, transparent: false, color: 0x777777 }));
      mesh.rotation.x = -Math.PI / 2;
      scene3D.add(mesh);
      this.mRenderCeilingTop.push(mesh);
    }
    catch (err) {
    }
  };

  this.BuildCeilingTop_Room = function (tFloor, tLineArray) {

    var tReg = [];
    for (j = 0; j < tLineArray.length - 1; j++)
      tReg.push(new poly2tri.Point(tLineArray[j].x, tLineArray[j].y));

    var swctx = new poly2tri.SweepContext(tReg);
    //===========================================================
    var hole = [];
    for (j = 0; j < tFloor.mPath.length; j++) {
      hole.push(new poly2tri.Point(tFloor.mPath[j].X, tFloor.mPath[j].Y));
    }
    swctx.addHole(hole);

    swctx.triangulate();
    var triangles = swctx.getTriangles();

    var geom = new THREE.Geometry();
    for (var k = 0; k < triangles.length; k++) {
      geom.vertices.push(new THREE.Vector3(triangles[k].points_[0].x, triangles[k].points_[0].y, this.m_fHeight));
      geom.vertices.push(new THREE.Vector3(triangles[k].points_[1].x, triangles[k].points_[1].y, this.m_fHeight));
      geom.vertices.push(new THREE.Vector3(triangles[k].points_[2].x, triangles[k].points_[2].y, this.m_fHeight));

      geom.faces.push(new THREE.Face3(3 * k + 0, 3 * k + 1, 3 * k + 2));

      geom.faceVertexUvs[0][k] = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 0)];
    }

    geom.computeFaceNormals();
    geom.verticesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    var mesh = new THREE.Mesh(geom, new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, opacity: 1, transparent: false, color: 0x777777 }));
    mesh.rotation.x = -Math.PI / 2;
    scene3D.add(mesh);
    this.mRenderCeilingTop_Room.push(mesh);
  };

  this.OnShowAlphaWall_In = function (bShow) {
    for (var k = 0; k < this.mWallClass3D_In.mWallArray.length; k++) {
      if (bShow == true) {
        this.mWallClass3D_In.mWallArray[k].mWallMesh.material.opacity = 0.5;
        this.mWallClass3D_In.mWallArray[k].mWallMesh.material.transparent = true;
      }
      else {
        this.mWallClass3D_In.mWallArray[k].mWallMesh.material.opacity = 1;
        this.mWallClass3D_In.mWallArray[k].mWallMesh.material.transparent = false;
      }
    }
  };

  // 
  /**
   * @api OnShowAlphaWall()
   * @apiGroup HouseClass 
   * @apiName  0
   * @apiDescription 外墙是否透明
   */
  this.OnShowAlphaWall = function (bShow) {
    for (var k = 0; k < this.mWallClass3D_Out.mWallArray.length; k++) {
      if (bShow == true)
        this.mWallClass3D_Out.mWallArray[k].mWallMesh.material.opacity = 0.5;
      else
        this.mWallClass3D_Out.mWallArray[k].mWallMesh.material.opacity = 1;
    }

    for (var k = 0; k < this.mWallClass3D_Out_Room.mWallArray.length; k++) {
      if (bShow == true)
        this.mWallClass3D_Out_Room.mWallArray[k].mWallMesh.material.opacity = 0.5;
      else
        this.mWallClass3D_Out_Room.mWallArray[k].mWallMesh.material.opacity = 1;
    }
  };

  this.OnShowAll_CeilingTop3D = function (bShow) {
    for (var j = 0; j < this.mRenderCeilingTop.length; j++)
      this.mRenderCeilingTop[j].visible = false;
  };

  /**
   * @api ClearCeilingTop()
   * @apiGroup HouseClass 
   * @apiName  0
   * @apiDescription 清除单房间墙顶
   */
  this.ClearCeilingTop = function () {
    for (var k = 0; k < this.mRenderCeilingTop.length; k++)
      scene3D.remove(this.mRenderCeilingTop[k]);
    this.mRenderCeilingTop.length = 0;
  };

  /**
   * @api ClearCeilingTop_Room()
   * @apiGroup HouseClass 
   * @apiName  0
   * @apiDescription 清除单房间屋顶
   */
  this.ClearCeilingTop_Room = function () {
    for (var k = 0; k < this.mRenderCeilingTop_Room.length; k++)
      scene3D.remove(this.mRenderCeilingTop_Room[k]);
    this.mRenderCeilingTop_Room.length = 0;
  };

  /**
   * @api ClearCeiling()
   * @apiGroup HouseClass 
   * @apiName  0
   * @apiDescription 清除屋顶
   */
  this.ClearCeiling = function () {
    for (var k = 0; k < this.mRenderCeiling.length; k++)
      scene3D.remove(this.mRenderCeiling[k]);
    this.mRenderCeiling.length = 0;
  };

  /**
   * @api OnClearWallTop()
   * @apiGroup HouseClass 
   * @apiName  0
   * @apiDescription 清除墙厚顶
   */
  this.OnClearWallTop = function () {
    scene.remove(this.mRenderWallTop);
  };


  /**
   * @api OnClear()
   * @apiGroup HouseClass 
   * @apiName  0
   * @apiDescription 清除所有户型信息
   */
  this.OnClear = function () {
    this.m_OBBox_Max.x = -99999;
    this.m_OBBox_Max.y = -99999;
    this.m_OBBox_Min.x = 99999;
    this.m_OBBox_Min.y = 99999;

    this.m_strCADXML = null;
    this.mWallClass.OnClear();

    if (this.mWallLineClass)
      this.mWallLineClass.OnClear();

    this.mFloorClass.OnClear();
    this.mCeilingClass.OnClear();
    this.mDecalClass.OnClear();
    this.mDoorClass.OnClear();
    this.mWindowClass.OnClear();
    this.mFurnitureClass.OnClear();
    this.mFlueClass.OnClear();
    this.mPillarClass.OnClear();
    this.mLiangClass.OnClear();
    this.mCeLiangClass.OnClear();
    this.mSvgClass.OnClear();

    if (this.mCADClass)
      this.mCADClass.OnClear();

    this.mGroundClass.OnClear();
    this.mText3DClass.OnClear();

    if (this.mWiring3DClass)
      this.mWiring3DClass.OnClear();

    if (this.mTrench3DClass)
      this.mTrench3DClass.OnClear();

    this.mTextClass.OnClear();
    this.mObjCtrl.OnClear();
    this.OnClearWallTop();

    this.mWallClass3D_In.OnClear();
    this.mWallClass3D_Out.OnClear();
    this.mWallClass3D_Out_Room.OnClear();
    this.ClearCeilingTop();
    this.ClearCeilingTop_Room();
    this.ClearCeiling();
    //this.mPlaneLightClass.OnClear();

    if (this.mWallboardClass)
      this.mWallboardClass.OnClear();

    if (this.mFloorParamClass)
      this.mFloorParamClass.OnClear();

    if (this.mCeilingParamClass)
      this.mCeilingParamClass.OnClear();

    if (this.mRulerClass)
      this.mRulerClass.OnClear();
  };

  /**
   * @api OnClear_Undo()
   * @apiGroup HouseClass 
   * @apiName  0
   * @apiDescription 操作撤销恢复时用
   */
  this.OnClear_Undo = function () {
    this.m_OBBox_Max.x = -99999;
    this.m_OBBox_Max.y = -99999;
    this.m_OBBox_Min.x = 99999;
    this.m_OBBox_Min.y = 99999;

    this.m_strCADXML = null;
    this.mWallClass.OnClear();
    if (this.mWallLineClass)
      this.mWallLineClass.OnClear();
    this.mFloorClass.OnClear();
    this.mCeilingClass.OnClear();
    this.mDecalClass.OnClear();
    this.mDoorClass.OnClear();
    this.mWindowClass.OnClear();
    //	this.mFurnitureClass.OnClear();
    this.mFlueClass.OnClear();
    this.mPillarClass.OnClear();
    this.mLiangClass.OnClear();
    this.mCeLiangClass.OnClear();
    this.mSvgClass.OnClear();
    if (this.mCADClass)
      this.mCADClass.OnClear();

    this.mGroundClass.OnClear();
    this.mText3DClass.OnClear();
    //	this.mWardrobeClass.OnClear();
    this.mTextClass.OnClear();
    this.mObjCtrl.OnClear();
    this.OnClearWallTop();

    this.mWallClass3D_In.OnClear();
    this.mWallClass3D_Out.OnClear();
    this.mWallClass3D_Out_Room.OnClear();
    this.ClearCeilingTop();
    this.ClearCeilingTop_Room();
    this.ClearCeiling();

    if (this.mWallboardClass)
      this.mWallboardClass.OnClear();

    if (this.mFloorParamClass)
      this.mFloorParamClass.OnClear();

    if (this.mCeilingParamClass)
      this.mCeilingParamClass.OnClear();
  };
  // 生成3D
  this.Build3D = function () {
    this.m_fHeight = app.GlobalSettings.num_2.int / 10;	// 房间高度


    if (this.mWallClass.solution_paths == null)	//没有绘制墙体
    {
      // 更新CAD墙体
      if (this.mWallLineClass)
        this.mWallLineClass.OnUpdate3D(true);
      this.mWindowClass.OnUpdate3D();
      this.mDoorClass.OnUpdate3D();

      this.mWallClass3D_In.CreateHole(this.mWindowClass.mWindowArray, this.mDoorClass.mDoorArray);
      this.mWallClass3D_Out.CreateHole(this.mWindowClass.mWindowArray, this.mDoorClass.mDoorArray);
      this.mFlueClass.OnUpdate3D();	// 新增加烟道柱体
      this.mPillarClass.OnUpdate3D();
      this.mLiangClass.OnUpdate3D();
      this.mCeilingClass.OnUpdate3D();	// 无墙体模式下，舞台不升高
      return;
    }
    else {
      // 更新CAD墙体
      if (this.mWallLineClass)
        this.mWallLineClass.OnUpdate3D(false);
      this.mWindowClass.OnUpdate3D();
      this.mDoorClass.OnUpdate3D();
      this.ClearCeilingTop();
      this.ClearCeilingTop_Room();
      //	this.mWallClass3D_In.OnClear();
      this.mWallClass3D_Out.OnClear();
      this.mWallClass3D_Out_Room.OnClear();

      this.mWallClass3D_In.m_fHeight = this.m_fHeight;	// 高度
      this.mWallClass3D_Out.m_fHeight = this.m_fHeight;	// 高度
      this.mWallClass3D_In.OnCreate(this.mWallClass.solution_paths, this.mWallClass.iMaxAreaFloor);
      this.mWallClass3D_Out.OnCreate(this.mWallClass.solution_paths, this.mWallClass.iMaxAreaFloor);
      this.BuildCeilingTop(this.mWallClass.solution_paths, this.mWallClass.iMaxAreaFloor);		// 3D下墙顶厚

      //this.BuildCeiling3D(this.mWallClass.solution_paths, this.mWallClass.iMaxAreaFloor);
      this.mFlueClass.OnUpdate3D();	// 新增加烟道柱体
      this.mPillarClass.OnUpdate3D();
      this.mLiangClass.OnUpdate3D();
      this.mCeilingClass.OnUpdate3D();
      //this.mCeiling3D.OnClear();
      //this.mCeiling3D.OnCreate(this.mWallClass.solution_paths, this.mWallClass.iMaxAreaFloor);
      this.mWallClass3D_In.CreateHole(this.mWindowClass.mWindowArray, this.mDoorClass.mDoorArray);
      this.mWallClass3D_Out.CreateHole(this.mWindowClass.mWindowArray, this.mDoorClass.mDoorArray);
    }
  };

  // 生成2D
  this.Build2D = function () {
    //	this.mFurnitureClass.Build();
    //	this.mWardrobeClass.Build2D();
  };

  //户型水平镜像
  this.HorizontalMirror = function () {
    if (IsContain(container, renderer2.domElement) == true) {
      alert("请在平面状态下操作.");
      return;
    }
    for (let index = 0; index < this.mWallClass.mWallArray.length; index++) {
      this.mWallClass.mWallArray[index].m_vStart.x = -this.mWallClass.mWallArray[index].m_vStart.x;
      this.mWallClass.mWallArray[index].m_vEnd.x = -this.mWallClass.mWallArray[index].m_vEnd.x;
      this.mWallClass.mWallArray[index].OnRender();
      this.mWallClass.mWallArray[index].OnShow(false);
    }
    this.mWallClass.OnUpdateAllWall();

    // 窗
    for (let index = 0; index < this.mWindowClass.mWindowArray.length; index++) {
      this.mWindowClass.mWindowArray[index].m_vPos.x = -this.mWindowClass.mWindowArray[index].m_vPos.x;
      this.mWindowClass.mWindowArray[index].UpdateWindow();
    }

    // 门
    for (let index = 0; index < this.mDoorClass.mDoorArray.length; index++) {
      this.mDoorClass.mDoorArray[index].m_vPos.x = -this.mDoorClass.mDoorArray[index].m_vPos.x;
      this.mDoorClass.mDoorArray[index].UpdateDoor();
    }
  };

  //户型垂直镜像
  this.VerticalMirror = function () {
    if (IsContain(container, renderer2.domElement) == true) {
      alert("请在平面状态下操作.");
      return;
    }

    for (let index = 0; index < this.mWallClass.mWallArray.length; index++) {
      this.mWallClass.mWallArray[index].m_vStart.y = -this.mWallClass.mWallArray[index].m_vStart.y;
      this.mWallClass.mWallArray[index].m_vEnd.y = -this.mWallClass.mWallArray[index].m_vEnd.y;
      this.mWallClass.mWallArray[index].OnRender();
      this.mWallClass.mWallArray[index].OnShow(false);
    }

    this.mWallClass.OnUpdateAllWall();

    // 窗
    for (let index = 0; index < this.mWindowClass.mWindowArray.length; index++) {
      this.mWindowClass.mWindowArray[index].m_vPos.y = -this.mWindowClass.mWindowArray[index].m_vPos.y;
      this.mWindowClass.mWindowArray[index].UpdateWindow();
    }

    // 门
    for (let index = 0; index < this.mDoorClass.mDoorArray.length; index++) {
      this.mDoorClass.mDoorArray[index].m_vPos.y = -this.mDoorClass.mDoorArray[index].m_vPos.y;
      this.mDoorClass.mDoorArray[index].UpdateDoor();
    }

  };

  // 旋转90
  this.Rotate_Mirror = function () {
    if (IsContain(container, renderer2.domElement) == true) {
      alert("请在平面状态下操作.");
      return;
    }

    this.HorizontalMirror();
    this.VerticalMirror();

  };



  /**
   * @api OnLoadWall_XML()
   * @apiGroup HouseClass 
   * @apiName  0
   * @apiDescription 读取快速绘制墙体
   */
  this.OnLoadWall_XML = function (data) {
    var x1 = parseFloat($(data).attr('StartX'));
    var y1 = parseFloat($(data).attr('StartY'));
    var z1 = parseFloat($(data).attr('StartZ'));

    var x2 = parseFloat($(data).attr('EndX'));
    var y2 = parseFloat($(data).attr('EndY'));
    var z2 = parseFloat($(data).attr('EndZ'));

    var iType = parseFloat($(data).attr('Type'));
    var fWidth = parseFloat($(data).attr('Width'));

    mHouseClass.mWallClass.OnAddWall1(x1, y1, x2, y2, iType, fWidth);
  };

  /**
   * @api OnSaveWall_XML()
   * @apiGroup HouseClass 
   * @apiName  0
   * @apiDescription 保存快速绘制墙体
   */
  this.OnSaveWall_XML = function () {
    let wallNum = mHouseClass.mWallClass.mWallArray.length;
    let strWallInfo = `<WallInfo num="${wallNum}"/>`;
    for (let index = 0; index < wallNum; ++index) {
      let tWall = mHouseClass.mWallClass.mWallArray[index];
      strWallInfo += `<WallData Type="${tWall.m_iType}" Width="${tWall.m_fWidth}" StartX="${tWall.m_vStart.x}" StartY="${tWall.m_vStart.y}" StartZ="${tWall.m_vStart.z}" EndX="${tWall.m_vEnd.x}" EndY="${tWall.m_vEnd.y}" EndZ="${tWall.m_vEnd.z}" ShowLabel="1"/>`;
    }

    return strWallInfo;
  };



  // 修改墙面材质
  this.OnChangeWallTex = function () {

  };

  this.OnSave2DtoImage = function () {
    let oldPostionX = mCameraClass.m_Camera.position.x;
    let oldPostionY = mCameraClass.m_Camera.position.y;
    let oldPostionZ = mCameraClass.m_Camera.position.z;

    let arrData = mHouseClass.mFloorClass.GetFloorCenter();
    let centerX = arrData[0];
    let centerY = arrData[1];
    let maxLength = arrData[2];
    /*		if(maxLength >1500)
        {
          maxLength = 1500;
        }
        else
        {
          maxLength += 50;
        }*/

    maxLength += 50;
    mCameraClass.m_Camera.position.set(0, 0, maxLength);

    render();

    var objData = renderer.domElement.toDataURL("image/jpeg");

    // 下载平面图片
    var oA = document.createElement("a");
    oA.download = '';	// 设置下载的文件名，默认是'下载'
    oA.href = objData;
    document.body.appendChild(oA);
    oA.click();
    oA.remove(); 		// 下载之后把创建的元素删除

    mCameraClass.m_Camera.position.set(oldPostionX, oldPostionY, oldPostionZ);
  }

  function drawAndShareImage(base64Image) {
    var canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    var context = canvas.getContext("2d");
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#fff";
    context.fill();
    var myImage = new Image();
    myImage.src = "./img/draw.png";// "./2.png";  //背景图片 你自己本地的图片或者在线图片
    myImage.crossOrigin = 'Anonymous';
    myImage.onload = function () {
      context.drawImage(myImage, 0, 0, 1920, 1080);

      var myImage2 = new Image();
      myImage2.src = base64Image;
      myImage2.crossOrigin = 'Anonymous';
      myImage2.onload = function () {

        /*
        if(myImage.width > myImage2.width && myImage.height > myImage2.height)
        {
          context.drawImage(myImage2 , (myImage.width -myImage2.width)/2, (myImage.height - myImage2.height)/2 , myImage2.width , myImage2.height);
        }
        else if(myImage.width > myImage2.width && myImage.height < myImage2.height)
        {
          context.drawImage(myImage2 , (myImage.width -myImage2.width)/2, 10 , myImage2.width , myImage.height - 20);
        }
        else if(myImage.width < myImage2.width && myImage.height > myImage2.height)
        {
          context.drawImage(myImage2 , 10, (myImage.height - myImage2.height)/2 ,myImage2.width-20 , myImage2.height);
        }
        else if(myImage.width < myImage2.width && myImage.height < myImage2.height)
        {
          context.drawImage(myImage2 ,10,10, myImage.width-20 ,myImage.height-20 );
        }
        */

        context.drawImage(myImage2, 200, 100, 1360, 768);
        var base64 = canvas.toDataURL("image/png"); //"image/png" 这里注意一下
        var oA = document.createElement("a");
        oA.download = '';	// 设置下载的文件名，默认是'下载'
        oA.href = base64;
        document.body.appendChild(oA);
        oA.click();
        oA.remove(); 		// 下载之后把创建的元素删除
      }
    }
  }

  //增加图例框 (开装)
  this.OnSave2DtoImage = function () {
    // 生成平面图
    m_Coordniate.OnShow(false);    // 隐藏网格

    var color = scene3D.background;
    scene3D.background = new THREE.Color(0xffffff);

    /*		scene.background =  new THREE.Color( 0xFFFFFF );
        var fOldZ = mCameraClass.m_Camera.position.z;
        mCameraClass.m_Camera.position.z = 1000;
        render();*/

    for (var i = 0; i < mHouseClass.mFloorClass.mFloorArray.length; i++) {
      if (mHouseClass.mFloorClass.mFloorArray[i].mFloorMesh3D)
        mHouseClass.mFloorClass.mFloorArray[i].mFloorMesh3D.visible = false;
    }

    for (var j = 0; j < mHouseClass.mCeilingClass.mCeilingArray.length; j++)
      mHouseClass.mCeilingClass.mCeilingArray[j].mCeilingMesh3D.visible = false;

    for (var j = 0; j < mHouseClass.mWallClass3D_In.mWallArray.length; j++) {
      if (mHouseClass.mWallClass3D_In.mWallArray[j].mWallMesh)
        mHouseClass.mWallClass3D_In.mWallArray[j].mWallMesh.visible = false;
    }
    for (var j = 0; j < mHouseClass.mWallClass3D_Out.mWallArray.length; j++) {
      if (mHouseClass.mWallClass3D_Out.mWallArray[j].mWallMesh)
        mHouseClass.mWallClass3D_Out.mWallArray[j].mWallMesh.visible = false;
    }

    if (mHouseClass.mRenderWallTop)
      mHouseClass.mRenderWallTop.visible = false;
    // 隐藏墙厚顶
    for (var j = 0; j < mHouseClass.mRenderCeilingTop.length; j++)
      mHouseClass.mRenderCeilingTop[j].visible = false;

    OnMouseRightUp();
    render();

    var objData = renderer2.domElement.toDataURL("image/jpeg");

    //增加图例框
    drawAndShareImage(objData);

    scene3D.background = color;
    mParamSystemDlg.OnShowCoord();
    OnShow3D();
  }

  //增加图例框 (开装)
  this.OnSave2DtoImage = function () {
    // 生成平面图
    m_Coordniate.OnShow(false);    // 隐藏网格

    var color = scene3D.background;
    scene3D.background = new THREE.Color(0xffffff);

    /*		scene.background =  new THREE.Color( 0xFFFFFF );
        var fOldZ = mCameraClass.m_Camera.position.z;
        mCameraClass.m_Camera.position.z = 1000;
        render();*/

    for (var i = 0; i < mHouseClass.mFloorClass.mFloorArray.length; i++) {
      if (mHouseClass.mFloorClass.mFloorArray[i].mFloorMesh3D)
        mHouseClass.mFloorClass.mFloorArray[i].mFloorMesh3D.visible = false;
    }

    for (var j = 0; j < mHouseClass.mCeilingClass.mCeilingArray.length; j++)
      mHouseClass.mCeilingClass.mCeilingArray[j].mCeilingMesh3D.visible = false;

    for (var j = 0; j < mHouseClass.mWallClass3D_In.mWallArray.length; j++) {
      if (mHouseClass.mWallClass3D_In.mWallArray[j].mWallMesh)
        mHouseClass.mWallClass3D_In.mWallArray[j].mWallMesh.visible = false;
    }
    for (var j = 0; j < mHouseClass.mWallClass3D_Out.mWallArray.length; j++) {
      if (mHouseClass.mWallClass3D_Out.mWallArray[j].mWallMesh)
        mHouseClass.mWallClass3D_Out.mWallArray[j].mWallMesh.visible = false;
    }

    if (mHouseClass.mRenderWallTop)
      mHouseClass.mRenderWallTop.visible = false;
    // 隐藏墙厚顶
    for (var j = 0; j < mHouseClass.mRenderCeilingTop.length; j++)
      mHouseClass.mRenderCeilingTop[j].visible = false;

    OnMouseRightUp();
    render();

    var objData = renderer2.domElement.toDataURL("image/jpeg");

    //增加图例框
    drawAndShareImage(objData);

    scene3D.background = color;
    mParamSystemDlg.OnShowCoord();
    OnShow3D();
  }

  this.OnSave2DtoImage1 = function () {
    // 带图例框导出
    m_Coordniate.OnShow(false);    // 隐藏网格

    var color = scene3D.background;
    scene3D.background = new THREE.Color(0xffffff);

    OnMouseRightUp();
    render();

    var objData = renderer2.domElement.toDataURL("image/jpeg");

    //增加图例框
    drawAndShareImage(objData);

    scene3D.background = color;
    mParamSystemDlg.OnShowCoord();
    OnShow3D();
  }

  this.Base64 = function (str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  };

  this.On3DMeasure = function () {
    this.mRulerClass.CreateRuler();

  }

  this.OnDelete3DMeasure = function () {
    this.mRulerClass.OnDeleteSelect();
  }

  this.OnDeleteAll3DMeasure = function () {
    this.mRulerClass.OnClear();
  }

  this.ParseJsonScene = function (strJsonData) {
    if ("" == strJsonData || "{}" == strJsonData)
      return;

    let jsonData = JSON.parse(strJsonData);

    for (var i = 0; i < jsonData.walls.length; i++)		// 2D墙体
    {
      mHouseClass.mWallClass.OnAddWall1(jsonData.walls[i].start.x * 100, jsonData.walls[i].start.y * 100,
        jsonData.walls[i].end.x * 100, jsonData.walls[i].end.y * 100, 0, 20);
    }

    for (var j = 0; j < jsonData.holes.length; j++) {
      if (jsonData.holes[j].type == "WINDOW" || jsonData.holes[j].type == "BAY_WINDOW")
        mHouseClass.mWindowClass.OnLoadWindow_Json(jsonData.holes[j]);
      if (jsonData.holes[j].type == "DOOR" || jsonData.holes[j].type == "DOUBLE_DOOR" ||
        jsonData.holes[j].type == "SLIDE_DOOR" || jsonData.holes[j].type == "ENTRANCE_DOOR" || jsonData.holes[j].type == "WALL_HOLE")
        mHouseClass.mDoorClass.OnLoadDoor_Json(jsonData.holes[j]);
    }

    var timestamp = new Date().getTime().toString();
    var strJiaJuCSV = $.ajax({ url: m_strHttp + 'jiaju/jiaju.csv?' + timestamp, async: false, });
    var a1 = strJiaJuCSV.responseText.split("\r\n");
    for (var k = 0; k < jsonData.furniture.length; k++) {
      for (var i = 1; i < a1.length; i++) {
        var s2 = a1[i];
        var a2 = s2.split(',');
        if (jsonData.furniture[k].furnitureid == a2[0]) {
          mHouseClass.mFurnitureClass.OnCreate3D_Json(jsonData.furniture[k], a2[2]);
          break;
        }
      }
    }

    mHouseClass.mWallClass.OnUpdateAllWall();
    mHouseClass.m_fHeight = jsonData.height * 100;	// 房间高度3D

    /*	this.mWallLineClass.OnUpdate3D(false);
 
            this.mDoorClass.OnUpdate3D();
            this.ClearCeilingTop();
            this.ClearCeilingTop_Room();*/
    //	this.mWallClass3D_In.OnClear();
    //	mHouseClass.mWindowClass.OnUpdate3D();
    mHouseClass.mWallClass3D_Out.OnClear();
    mHouseClass.mWallClass3D_In.m_fHeight = mHouseClass.m_fHeight;	// 高度
    mHouseClass.mWallClass3D_Out.m_fHeight = mHouseClass.m_fHeight;	// 高度
    mHouseClass.mWallClass3D_In.OnCreate(mHouseClass.mWallClass.solution_paths, mHouseClass.mWallClass.iMaxAreaFloor);
    mHouseClass.mWallClass3D_Out.OnCreate(mHouseClass.mWallClass.solution_paths, mHouseClass.mWallClass.iMaxAreaFloor);
    mHouseClass.BuildCeilingTop(mHouseClass.mWallClass.solution_paths, mHouseClass.mWallClass.iMaxAreaFloor);		// 3D下墙顶厚

    /*	  //this.BuildCeiling3D(this.mWallClass.solution_paths, this.mWallClass.iMaxAreaFloor);
        this.mFlueClass.OnUpdate3D();	// 新增加烟道柱体
        this.mPillarClass.OnUpdate3D();
        this.mLiangClass.OnUpdate3D();
        //this.mCeiling3D.OnClear();*/

    mHouseClass.mCeilingClass.OnUpdate3D();
    mHouseClass.mWallClass3D_In.CreateHole(mHouseClass.mWindowClass.mWindowArray, mHouseClass.mDoorClass.mDoorArray);
    mHouseClass.mWallClass3D_Out.CreateHole(mHouseClass.mWindowClass.mWindowArray, mHouseClass.mDoorClass.mDoorArray);

    var tFloorTexArray = new Array();
    var tWallTexArray = new Array();

    var strMatCSV = $.ajax({ url: m_strHttp + 'texture/huawen.csv?' + timestamp, async: false, });
    var a1 = strMatCSV.responseText.split("\r\n");
    for (var i = 1; i < a1.length; i++) {
      var s2 = a1[i];
      var a2 = s2.split(',');
      for (var k = 0; k < jsonData.rooms.length; k++) {
        if (jsonData.rooms[k].floorboardid == a2[0]) {
          var textureData = new TextureData();

          textureData.m_x1 = Number(jsonData.rooms[k].position.x) * 100;			// 位置
          textureData.m_y1 = Number(jsonData.rooms[k].position.y) * 100;
          textureData.m_z1 = 0;
          textureData.m_fRotate = 0;			// 旋转
          textureData.m_fMode = 0;
          textureData.m_fOffX = 0;			// 偏移
          textureData.m_fOffY = 0;

          var a3 = a2[2].split('A');
          this.m_fLength = a3[0];
          this.m_fWidth = a3[1];
          textureData.m_fLength = a3[0];
          textureData.m_fWidth = a3[1];
          textureData.m_strFile = a2[1];						// 文件路径
          textureData.m_fAlpha = 0;

          textureData.mMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color('#ffffff') });

          if (textureData.m_strFile == "floor.jpg")
            textureData.mTexture = mResource.mFloorTex;
          else if (textureData.m_strFile == "windows/win1.png")
            textureData.mTexture = mResource.mWallTex;
          else {
            textureData.m_strFile = textureData.m_strFile.replace(/texture\//g, '/');
            textureData.mTexture = new THREE.TextureLoader().load(m_strHttp + '/texture/' + textureData.m_strFile);
          }

          textureData.mTexture.wrapS = textureData.mTexture.wrapT = THREE.RepeatWrapping;
          tFloorTexArray.push(textureData);
        }
      }
    }

    mPluginsClass.SetFloorTex(tFloorTexArray);		// 设置地面材质

    mHouseClass.mWindowClass.OnUpdate2D();
    // 设置房间墙面材质
    //=====================================================================================================
    var a1 = strMatCSV.responseText.split("\r\n");
    for (var k = 0; k < jsonData.rooms.length; k++) {
      for (var i = 1; i < a1.length; i++) {
        var s2 = a1[i];
        var a2 = s2.split(',');

        if (jsonData.rooms[k].wallpaperid == a2[0]) {
          var textureData = new TextureData();

          textureData.m_x1 = Number(jsonData.rooms[k].position.x) * 100;			// 位置
          textureData.m_y1 = Number(jsonData.rooms[k].position.y) * 100;
          textureData.m_z1 = 0;
          textureData.m_fRotate = 0;			// 旋转
          textureData.m_fMode = 0;
          textureData.m_fOffX = 0;			// 偏移
          textureData.m_fOffY = 0;

          var a3 = a2[2].split('A');
          this.m_fLength = a3[0];
          this.m_fWidth = a3[1];
          textureData.m_fLength = a3[0];
          textureData.m_fWidth = a3[1];
          textureData.m_strFile = a2[1];						// 文件路径
          textureData.m_fAlpha = 0;

          textureData.mMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color('#ffffff') });

          if (textureData.m_strFile == "floor.jpg")
            textureData.mTexture = mResource.mFloorTex;
          else if (textureData.m_strFile == "windows/win1.png")
            textureData.mTexture = mResource.mWallTex;
          else {
            textureData.m_strFile = textureData.m_strFile.replace(/texture\//g, '/');
            textureData.mTexture = new THREE.TextureLoader().load(m_strHttp + '/texture/' + textureData.m_strFile);
          }

          textureData.mTexture.wrapS = textureData.mTexture.wrapT = THREE.RepeatWrapping;
          tWallTexArray.push(textureData);
          break;
        }
      }
    }
    this.UpdateRoomTex(tWallTexArray);
    //if( tNewWallTextArray.length > 0 )
    //	mPluginsClass.SetWallTex( tNewWallTextArray );		// 设置墙面材质
    //=====================================================================================================
    return;
  };

  this.UpdateRoomTex = function (tWallTexArray) {
    var tNewWallTextArray = new Array();
    for (var i = 0; i < tWallTexArray.length; i++) {
      /*	var geometry_2 = new THREE.Geometry();			
        geometry_2.vertices.push( new THREE.Vector3( tWallTexArray[i].m_x1, 1000,-tWallTexArray[i].m_y1), new THREE.Vector3(tWallTexArray[i].m_x1, 0,-tWallTexArray[i].m_y1));
        this.m_cCoord3D1 = new THREE.LineSegments( geometry_2, new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 1 } ) );			
        scene3D.add( this.m_cCoord3D1 );*/

      var tFloor = mHouseClass.mFloorClass.GetFloor3DByXY(tWallTexArray[i].m_x1, tWallTexArray[i].m_y1);
      if (tFloor == null)
        continue;

      var iCoutWall = tFloor.GetCountWall();
      for (var j = 0; j < iCoutWall; j++) {
        var iWall = tFloor.GetWallClass3D_In(j);

        mHouseClass.mWallClass3D_In.mWallArray[iWall].mWallMesh.geometry.computeBoundingBox();
        mHouseClass.mWallClass3D_In.mWallArray[iWall].mTextureData = new TextureData();
        mHouseClass.mWallClass3D_In.mWallArray[iWall].mTextureData.Copy(tWallTexArray[i]);

        var tWall = mHouseClass.mWallClass3D_In.mWallArray[iWall];
        var tMesh = mHouseClass.mWallClass3D_In.mWallArray[iWall].mWallMesh;
        mHouseClass.mWallClass3D_In.mWallArray[iWall].mTextureData.m_x1 = (tWall.m_vStart.x + tWall.m_vEnd.x) / 2;
        mHouseClass.mWallClass3D_In.mWallArray[iWall].mTextureData.m_y1 = (tWall.m_vStart.y + tWall.m_vEnd.y) / 2;
        mHouseClass.mWallClass3D_In.mWallArray[iWall].mTextureData.m_z1 = (tMesh.geometry.boundingBox.min.z + tMesh.geometry.boundingBox.max.z) / 2;
        mHouseClass.mWallClass3D_In.mWallArray[iWall].mWallMesh.material.map = mHouseClass.mWallClass3D_In.mWallArray[iWall].mTextureData.mTexture;
        mHouseClass.mWallClass3D_In.mWallArray[iWall].mWallMesh.material.needsUpdate = true;
      }
    }
  }
}



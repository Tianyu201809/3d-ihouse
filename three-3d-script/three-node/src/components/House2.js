import {} from ''

class House {
  constructor() {
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
  }
  onInit = () => {
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
    var loader = new THREE.FontLoader();
    loader.load(m_strHttp + 'fonts/FZLanTingHeiS-DB-GB_Regular.xml', function (font) {
      mHouseClass.mFont = font;
      mHouseClass.m_fontLoaded = true;
    });
  }
}
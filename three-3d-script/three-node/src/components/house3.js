var m_iIndex = 0;
var mLightmapTex;
var arrUV;
function HouseClass() {
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
  this.m_strXML;
  this.m_pCurObj = null;
  this.OnInit = function () {
  }

  // 读取渲染数据
  this.OnLoadXML = function (strXML) {
    this.m_strXML = strXML;

    var xmlDoc = $.parseXML(strXML);
    var $xml = $(xmlDoc);

    $xml.find("Wall").each(function (j) { mHouseClass.OnLoadWallIn($(this)); });

    $xml.find("WallOut").each(function (j) { mHouseClass.OnLoadWallOut($(this)); });

    $xml.find("Floor").each(function (j) { mHouseClass.OnLoadFloor($(this)); });

    $xml.find("CeilingTop").each(function (j) { mHouseClass.OnLoadCeilingTop($(this)); });

    $xml.find("Ceiling").each(function (j) { mHouseClass.OnLoadCeiling($(this)); });

    $xml.find("Door").each(function (j) { mHouseClass.OnLoadDoor($(this)); });

    $xml.find("Window").each(function (j) { mHouseClass.OnLoadWindow($(this)); });

    $xml.find("Furniture").each(function (j) { mHouseClass.OnLoadFurniture($(this)); });

    $xml.find("Wallboard").each(function (j) { mHouseClass.OnLoadObj($(this)); });

    //$xml.find("AnimationMatrix").each(function(j){mHouseClass.OnLoadAnimationMatrix($(this));});

    //灯光
    $xml.find("LightData").each(function (j) { mLightClass.OnLoadPlaneLight_XML($(this)); });

    //环境光以及太阳光
    mLightClass.OnLoadEnvironmentAndSunLight($xml);

    if ($xml.find("SceneFilePath")) {
      m_scenePath = $xml.find("SceneFilePath").text();
    }

    if ($xml.find("UserAccount")) {
      userAccount = $xml.find("UserAccount").text();
    }

    if ($xml.find("SystemVersion")) {
      let systemVersion = $xml.find("SystemVersion").text();
      if ('PGlob3VzZSwzZD4=' == systemVersion) {
        m_freeVersion = '1';
      }
    }
  }

  this.OnClear = function () {
    mPlaneLightArray.OnClear();
  }

  this.OnLoadXML_Bake = function (xmlData, bakePng) {
    m_iLightMap = 1;
    // 烘焙房间
    mLightmapTex = new THREE.TextureLoader().load(bakePng);
    mLightmapTex.wrapS = mLightmapTex.wrapT = THREE.RepeatWrapping;

    var xmlDoc = $.parseXML(xmlData);
    var $xml = $(xmlDoc);
    arrUV = [];

    $xml.find("data").each(function (j) {
      let fU = parseFloat($(this).attr('u'));
      let fV = parseFloat($(this).attr('v'));

      arrUV.push({ 'u': fU, 'v': fV });
    });

    m_iIndex = 0;

    for (var i = mHouseClass.mRenderFloor.length - 1; i >= 0; i--)
      scene3D.remove(mHouseClass.mRenderFloor[i]);
    mHouseClass.mRenderFloor.length = 0;

    for (var i = mHouseClass.mRenderWall_Out.length - 1; i >= 0; i--)
      scene3D.remove(mHouseClass.mRenderWall_Out[i]);
    mHouseClass.mRenderWall_Out.length = 0;

    for (var i = mHouseClass.mRenderWall_Out.length - 1; i >= 0; i--)
      scene3D.remove(mHouseClass.mRenderWall_In[i]);
    mHouseClass.mRenderWall_In.length = 0;

    for (var i = mHouseClass.mRenderCeilingTop.length - 1; i >= 0; i--)
      scene3D.remove(mHouseClass.mRenderCeilingTop[i]);
    mHouseClass.mRenderCeilingTop.length = 0;

    for (var i = mHouseClass.mRenderCeiling.length - 1; i >= 0; i--)
      scene3D.remove(mHouseClass.mRenderCeiling[i]);
    mHouseClass.mRenderCeiling.length = 0;

    var xmlDoc1 = $.parseXML(this.m_strXML);
    var $xml1 = $(xmlDoc1);

    $xml1.find("WallOut").each(function (j) { mHouseClass.OnLoadWallOut_Lightmap($(this)); });

    $xml1.find("Wall").each(function (j) { mHouseClass.OnLoadWallIn_Lightmap($(this)); });

    $xml1.find("Floor").each(function (j) { mHouseClass.OnLoadFloor_Lightmap($(this)); });

    $xml1.find("CeilingTop").each(function (j) { mHouseClass.OnLoadCeilingTop_Lightmap($(this)); });

    $xml1.find("Ceiling").each(function (j) { mHouseClass.OnLoadCeiling_Lightmap($(this)); });
  };

  this.OnLoadFloor_Lightmap = function (data) {
    var geom = new THREE.Geometry();
    // 得到顶点数据
    for (var i = 0; i < data.find('PosArray').find('pos').length; i++) {
      var posX = parseFloat($(data.find('PosArray').find('pos')[i]).attr('X'));
      var posY = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Y'));
      var posZ = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Z'));
      geom.vertices.push(new THREE.Vector3(posX, posY, posZ));
    }

    for (var index = 0; index < geom.vertices.length; index += 3)
      geom.faces.push(new THREE.Face3(3 * index / 3 + 0, 3 * index / 3 + 1, 3 * index / 3 + 2));

    geom.computeBoundingBox();


    this.SetBoundingBox(geom.boundingBox);
    geom.faceVertexUvs[1] = new Array();
    for (var i = 0; i < data.find('UVArray').find('uv').length; i += 3) {
      var u1 = parseFloat($(data.find('UVArray').find('uv')[i + 0]).attr('u'));
      var v1 = parseFloat($(data.find('UVArray').find('uv')[i + 0]).attr('v'));

      var u2 = parseFloat($(data.find('UVArray').find('uv')[i + 1]).attr('u'));
      var v2 = parseFloat($(data.find('UVArray').find('uv')[i + 1]).attr('v'));

      var u3 = parseFloat($(data.find('UVArray').find('uv')[i + 2]).attr('u'));
      var v3 = parseFloat($(data.find('UVArray').find('uv')[i + 2]).attr('v'));

      geom.faceVertexUvs[1].push([new THREE.Vector2(v1, u1),
      new THREE.Vector2(v2, u2),
      new THREE.Vector2(v3, u3)]);

    }

    for (var i = 0; i < geom.vertices.length; i += 3) {
      geom.faceVertexUvs[0].push([
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 0].u), 1 - parseFloat(arrUV[m_iIndex + 0].v)),
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 1].u), 1 - parseFloat(arrUV[m_iIndex + 1].v)),
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 2].u), 1 - parseFloat(arrUV[m_iIndex + 2].v))]);

      m_iIndex += 3;
    }

    geom.computeFaceNormals();
    geom.verticesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    let strPaveImage = data.find('SourceImage').attr('src');

    let strImageURL = '';

    //读取场景中地面贴图带texture,点击地面铺贴时贴图路径没有带texture
    if (-1 == strPaveImage.indexOf('texture'))
      strImageURL = m_strHttp + "texture/" + strPaveImage;
    else
      strImageURL = m_strHttp + strPaveImage;

    var texture = new THREE.TextureLoader().load(strImageURL);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;


    var tMaterial = new THREE.MeshPhongMaterial({
      side: THREE.FrontSide,
      //	color: '#999999',
      lightMap: texture,
      map: mLightmapTex,
      //	blending :THREE.NormalBlending,
      //	lightMapIntensity:0.01,
    });

    tMaterial.needsUpdate = true;

    var tMesh = new THREE.Mesh(geom, tMaterial);
    tMesh.rotation.x = -Math.PI / 2;
    scene3D.add(tMesh);
    this.mRenderFloor.push(tMesh);
  }

  this.OnLoadWallOut_Lightmap = function (data) {
    var geom = new THREE.Geometry();
    // 得到顶点数据
    for (var i = 0; i < data.find('PosArray').find('pos').length; i++) {
      var posX = parseFloat($(data.find('PosArray').find('pos')[i]).attr('X'));
      var posY = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Y'));
      var posZ = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Z'));
      geom.vertices.push(new THREE.Vector3(posX, posY, posZ));
    }

    for (var index = 0; index < geom.vertices.length; index += 3)
      geom.faces.push(new THREE.Face3(3 * index / 3 + 0, 3 * index / 3 + 1, 3 * index / 3 + 2));

    geom.faceVertexUvs[1] = new Array();
    for (var i = 0; i < data.find('UVArray').find('uv').length; i += 3) {
      var u1 = parseFloat($(data.find('UVArray').find('uv')[i + 0]).attr('u'));
      var v1 = parseFloat($(data.find('UVArray').find('uv')[i + 0]).attr('v'));

      var u2 = parseFloat($(data.find('UVArray').find('uv')[i + 1]).attr('u'));
      var v2 = parseFloat($(data.find('UVArray').find('uv')[i + 1]).attr('v'));

      var u3 = parseFloat($(data.find('UVArray').find('uv')[i + 2]).attr('u'));
      var v3 = parseFloat($(data.find('UVArray').find('uv')[i + 2]).attr('v'));

      geom.faceVertexUvs[1].push([new THREE.Vector2(u1, v1),
      new THREE.Vector2(u2, v2),
      new THREE.Vector2(u3, v3)]);
    }


    for (var i = 0; i < geom.vertices.length; i += 3) {
      geom.faceVertexUvs[0].push([
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 0].u), 1 - parseFloat(arrUV[m_iIndex + 0].v)),
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 1].u), 1 - parseFloat(arrUV[m_iIndex + 1].v)),
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 2].u), 1 - parseFloat(arrUV[m_iIndex + 2].v))]);

      m_iIndex += 3;
    }
    //	geom.faceVertexUvs[1] = geom.faceVertexUvs[0];
    geom.computeFaceNormals();
    geom.verticesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    let strPaveImage = data.find('SourceImage').attr('src');
    var texture = new THREE.TextureLoader().load(m_strHttp + 'texture/' + strPaveImage);
    //	var texture = new THREE.TextureLoader().load(m_strHttp + 'texture/system/lightmap88.jpg' );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    var tMaterial = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      //color: '#dddddd',
      lightMap: texture,
      map: mLightmapTex,
      lightMapIntensity: 0.7,
    });

    tMaterial.needsUpdate = true;

    var tMesh = new THREE.Mesh(geom, tMaterial);
    tMesh.rotation.x = -Math.PI / 2;
    scene3D.add(tMesh);
    this.mRenderWall_Out.push(tMesh);
  }

  this.OnLoadWallIn_Lightmap = function (data) {
    var geom = new THREE.Geometry();

    var vData = data.find('PosArray').find('pos');
    var vLen = vData.length;

    // 得到顶点数据
    for (var i = 0; i < vLen; i++) {
      var posX = parseFloat($(vData[i]).attr('X'));
      var posY = parseFloat($(vData[i]).attr('Y'));
      var posZ = parseFloat($(vData[i]).attr('Z'));
      geom.vertices.push(new THREE.Vector3(posX, posY, posZ));
    }

    for (var index = 0; index < geom.vertices.length; index += 3)
      geom.faces.push(new THREE.Face3(3 * index / 3 + 0, 3 * index / 3 + 1, 3 * index / 3 + 2));

    geom.computeBoundingBox();

    var uvData = data.find('UVArray').find('uv');
    var uvLen = uvData.length;
    geom.faceVertexUvs[1] = new Array();
    for (var i = 0; i < uvLen; i += 3) {
      var u1 = parseFloat($(uvData[i + 0]).attr('u'));
      var v1 = parseFloat($(uvData[i + 0]).attr('v'));

      var u2 = parseFloat($(uvData[i + 1]).attr('u'));
      var v2 = parseFloat($(uvData[i + 1]).attr('v'));

      var u3 = parseFloat($(uvData[i + 2]).attr('u'));
      var v3 = parseFloat($(uvData[i + 2]).attr('v'));

      geom.faceVertexUvs[1].push([new THREE.Vector2(u1, v1),
      new THREE.Vector2(u2, v2),
      new THREE.Vector2(u3, v3)]);

    }


    for (var i = 0; i < geom.vertices.length; i += 3) {
      geom.faceVertexUvs[0].push([
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 0].u), 1 - parseFloat(arrUV[m_iIndex + 0].v)),
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 2].u), 1 - parseFloat(arrUV[m_iIndex + 2].v)),
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 1].u), 1 - parseFloat(arrUV[m_iIndex + 1].v))]);

      m_iIndex += 3;
    }

    geom.computeFaceNormals();
    geom.verticesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    let strPaveImage = data.find('SourceImage').attr('src');
    let strImageURL = '';

    if (-1 == strPaveImage.indexOf('texture'))
      strImageURL = m_strHttp + "texture/" + strPaveImage;
    else
      strImageURL = m_strHttp + strPaveImage;

    //		var texture = new THREE.TextureLoader().load(m_strHttp + 'texture/system/lightmap96.jpg' );
    var texture = new THREE.TextureLoader().load(strImageURL);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    var tMaterial = new THREE.MeshPhongMaterial({
      //	var tMaterial = new THREE.MeshBasicMaterial( {
      //	color: '#FFFFFF',
      side: THREE.DoubleSide,
      lightMap: texture,
      map: mLightmapTex,
      //blending :THREE.NormalBlending,
      //lightMapIntensity:0.25,
    });

    tMaterial.needsUpdate = true;

    var tMesh = new THREE.Mesh(geom, tMaterial);
    tMesh.userData = "";
    tMesh.rotation.x = -Math.PI / 2;
    scene3D.add(tMesh);
    this.mRenderWall_In.push(tMesh);
  };

  this.OnLoadCeilingTop_Lightmap = function (data) {
    var geom = new THREE.Geometry();
    // 得到顶点数据
    for (var i = 0; i < data.find('PosArray').find('pos').length; i++) {
      var posX = parseFloat($(data.find('PosArray').find('pos')[i]).attr('X'));
      var posY = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Y'));
      var posZ = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Z'));
      geom.vertices.push(new THREE.Vector3(posX, posY, posZ));
    }

    for (var index = 0; index < geom.vertices.length; index += 3)
      geom.faces.push(new THREE.Face3(3 * index / 3 + 0, 3 * index / 3 + 1, 3 * index / 3 + 2));

    for (var i = 0; i < geom.vertices.length; i += 3) {
      geom.faceVertexUvs[0].push([
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 0].u), 1 - parseFloat(arrUV[m_iIndex + 0].v)),
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 2].u), 1 - parseFloat(arrUV[m_iIndex + 2].v)),
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 1].u), 1 - parseFloat(arrUV[m_iIndex + 1].v))]);

      m_iIndex += 3;
    }

    geom.computeFaceNormals();
    geom.verticesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    let strPaveImage = data.find('SourceImage').attr('src');
    var tMaterial = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
    var texture = new THREE.TextureLoader().load('../' + strPaveImage);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    tMaterial.map = texture;
    tMaterial.needsUpdate = true;
    var tMesh = new THREE.Mesh(geom, tMaterial);
    tMesh.rotation.x = -Math.PI / 2;
    scene3D.add(tMesh);
    this.mRenderCeilingTop.push(tMesh);
  }

  this.OnLoadCeiling_Lightmap = function (data) {
    //顶面
    var geom = new THREE.Geometry();
    // 得到顶点数据
    for (var i = 0; i < data.find('PosArray').find('pos').length; i++) {
      var posX = parseFloat($(data.find('PosArray').find('pos')[i]).attr('X'));
      var posY = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Y'));
      var posZ = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Z'));
      geom.vertices.push(new THREE.Vector3(posX, posY, posZ));
    }

    for (var index = 0; index < geom.vertices.length; index += 3)
      geom.faces.push(new THREE.Face3(3 * index / 3 + 0, 3 * index / 3 + 1, 3 * index / 3 + 2));

    geom.faceVertexUvs[1] = new Array();
    for (var i = 0; i < data.find('UVArray').find('uv').length; i += 3) {
      var u1 = parseFloat($(data.find('UVArray').find('uv')[i + 0]).attr('u'));
      var v1 = parseFloat($(data.find('UVArray').find('uv')[i + 0]).attr('v'));

      var u2 = parseFloat($(data.find('UVArray').find('uv')[i + 1]).attr('u'));
      var v2 = parseFloat($(data.find('UVArray').find('uv')[i + 1]).attr('v'));

      var u3 = parseFloat($(data.find('UVArray').find('uv')[i + 2]).attr('u'));
      var v3 = parseFloat($(data.find('UVArray').find('uv')[i + 2]).attr('v'));

      geom.faceVertexUvs[1].push([new THREE.Vector2(u1, v1),
      new THREE.Vector2(u2, v2),
      new THREE.Vector2(u3, v3)]);
    }

    for (var i = 0; i < geom.vertices.length; i += 3) {
      geom.faceVertexUvs[0].push([
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 0].u), 1 - parseFloat(arrUV[m_iIndex + 0].v)),
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 1].u), 1 - parseFloat(arrUV[m_iIndex + 1].v)),
        new THREE.Vector2(parseFloat(arrUV[m_iIndex + 2].u), 1 - parseFloat(arrUV[m_iIndex + 2].v))]);

      m_iIndex += 3;
    }

    geom.computeFaceNormals();
    geom.verticesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    let strPaveImage = data.find('SourceImage').attr('src');
    //	var tMaterial = new THREE.MeshPhongMaterial({ side: THREE.FrontSide});			// THREE.DoubleSide
    var texture = new THREE.TextureLoader().load(m_strHttp + 'texture/' + strPaveImage);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    var tMaterial = new THREE.MeshPhongMaterial({
      //	var tMaterial = new THREE.MeshBasicMaterial( {

      side: THREE.FrontSide,
      lightMap: texture,
      map: mLightmapTex,
    });

    tMaterial.needsUpdate = true;
    var tMesh = new THREE.Mesh(geom, tMaterial);
    tMesh.rotation.x = -Math.PI / 2;
    scene3D.add(tMesh);
    this.mRenderCeiling.push(tMesh);
  }

  this.OnLoadWallIn = function (data) {
    var geom = new THREE.Geometry();

    var vData = data.find('PosArray').find('pos');
    var vLen = vData.length;

    // 得到顶点数据
    for (var i = 0; i < vLen; i++) {
      var posX = parseFloat($(vData[i]).attr('X'));
      var posY = parseFloat($(vData[i]).attr('Y'));
      var posZ = parseFloat($(vData[i]).attr('Z'));
      geom.vertices.push(new THREE.Vector3(posX, posY, posZ));
    }

    for (var index = 0; index < geom.vertices.length; index += 3)
      geom.faces.push(new THREE.Face3(3 * index / 3 + 0, 3 * index / 3 + 1, 3 * index / 3 + 2));

    let nImageLength = parseInt(data.find('SourceImage').attr('length')); // 贴图宽
    let nImageWidth = parseInt(data.find('SourceImage').attr('width')); // 贴图高

    geom.computeBoundingBox();

    var fLength = Math.sqrt((geom.boundingBox.min.x - geom.boundingBox.max.x) *
      (geom.boundingBox.min.x - geom.boundingBox.max.x) +
      (geom.boundingBox.min.y - geom.boundingBox.max.y) *
      (geom.boundingBox.min.y - geom.boundingBox.max.y));

    var fw = fLength / nImageLength;
    var fh = (geom.boundingBox.max.z - geom.boundingBox.min.z) / nImageWidth;

    //	var tmpMatrix0	= new THREE.Matrix4().makeScale(fw * 10,fh * 10);
    var uvData = data.find('UVArray').find('uv');
    var uvLen = uvData.length;

    for (var i = 0; i < uvLen; i += 3) {
      var u1 = parseFloat($(uvData[i + 0]).attr('u'));
      var v1 = parseFloat($(uvData[i + 0]).attr('v'));

      var u2 = parseFloat($(uvData[i + 1]).attr('u'));
      var v2 = parseFloat($(uvData[i + 1]).attr('v'));

      var u3 = parseFloat($(uvData[i + 2]).attr('u'));
      var v3 = parseFloat($(uvData[i + 2]).attr('v'));

      geom.faceVertexUvs[0].push([new THREE.Vector2(u1, v1),
      new THREE.Vector2(u2, v2),
      new THREE.Vector2(u3, v3)]);

    }

    geom.computeFaceNormals();
    geom.verticesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    let strPaveImage = data.find('SourceImage').attr('src');
    let customdata = '';
    if (-1 != strPaveImage.indexOf("custom.jpg")) {
      customdata = data.find('SourceImage').attr('customdata');
      customdata = decodeURIComponent(customdata);
    }

    let strImageURL = '';

    //读取场景中地面贴图带texture,点击地面铺贴时贴图路径没有带texture
    if (-1 == strPaveImage.indexOf('texture')) {
      strImageURL = m_strHttp + "texture/" + strPaveImage;
    }
    else {
      strImageURL = m_strHttp + strPaveImage;
    }

    var tMesh = '';

    //自定义，模型使用颜色
    if (customdata != "") {
      var jData = JSON.parse(customdata);
      var colorR = parseFloat(jData.colorR) * 255;
      var colorG = parseFloat(jData.colorG) * 255;
      var colorB = parseFloat(jData.colorB) * 255;

      var textColor = this.Rgb2Hex(colorR, colorG, colorB)

      var tMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
      tMaterial.color.setHex(parseInt(textColor));
      tMesh = new THREE.Mesh(geom, tMaterial);
      tMesh.userData = customdata;
    }
    else {
      var texture = new THREE.TextureLoader().load(strImageURL);
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      var tMaterial = new THREE.MeshPhongMaterial({ side: THREE.BackSide });
      tMaterial.map = texture;
      tMaterial.needsUpdate = true;
      tMesh = new THREE.Mesh(geom, tMaterial);
      tMesh.userData = "";
    }

    tMesh.rotation.x = -Math.PI / 2;
    scene3D.add(tMesh);
    this.mRenderWall_In.push(tMesh);
  }

  this.Rgb2Hex = function (r, g, b) {
    r = ('0' + (Math.round(r) || 0).toString(16)).slice(-2)
    g = ('0' + (Math.round(g) || 0).toString(16)).slice(-2)
    b = ('0' + (Math.round(b) || 0).toString(16)).slice(-2)
    return '0x' + r + g + b
  }


  this.OnLoadWallOut = function (data) {
    var geom = new THREE.Geometry();
    // 得到顶点数据
    for (var i = 0; i < data.find('PosArray').find('pos').length; i++) {
      var posX = parseFloat($(data.find('PosArray').find('pos')[i]).attr('X'));
      var posY = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Y'));
      var posZ = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Z'));
      geom.vertices.push(new THREE.Vector3(posX, posY, posZ));
    }

    for (var index = 0; index < geom.vertices.length; index += 3)
      geom.faces.push(new THREE.Face3(3 * index / 3 + 0, 3 * index / 3 + 1, 3 * index / 3 + 2));

    for (var i = 0; i < data.find('UVArray').find('uv').length; i += 3) {
      var u1 = parseFloat($(data.find('UVArray').find('uv')[i + 0]).attr('u'));
      var v1 = parseFloat($(data.find('UVArray').find('uv')[i + 0]).attr('v'));

      var u2 = parseFloat($(data.find('UVArray').find('uv')[i + 1]).attr('u'));
      var v2 = parseFloat($(data.find('UVArray').find('uv')[i + 1]).attr('v'));

      var u3 = parseFloat($(data.find('UVArray').find('uv')[i + 2]).attr('u'));
      var v3 = parseFloat($(data.find('UVArray').find('uv')[i + 2]).attr('v'));

      geom.faceVertexUvs[0].push([new THREE.Vector2(u1, v1),
      new THREE.Vector2(u2, v2),
      new THREE.Vector2(u3, v3)]);
    }

    geom.computeFaceNormals();
    geom.verticesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    let strPaveImage = data.find('SourceImage').attr('src');
    //	this.m_TransPaveImageWidth 	  = data.find('PaveImage').attr('length');		// 贴图宽
    //	this.m_TransPaveImageHeight	  = data.find('PaveImage').attr('width');		// 贴图高

    var tMaterial = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
    //	var texture = new THREE.TextureLoader().load('../' + strPaveImage );
    var texture = new THREE.TextureLoader().load(m_strHttp + 'texture/' + strPaveImage);

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    tMaterial.map = texture;
    tMaterial.needsUpdate = true;
    var tMesh = new THREE.Mesh(geom, tMaterial);
    tMesh.rotation.x = -Math.PI / 2;
    scene3D.add(tMesh);
    this.mRenderWall_Out.push(tMesh);
  }

  this.OnLoadFloor = function (data) {
    var geom = new THREE.Geometry();
    // 得到顶点数据
    for (var i = 0; i < data.find('PosArray').find('pos').length; i++) {
      var posX = parseFloat($(data.find('PosArray').find('pos')[i]).attr('X'));
      var posY = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Y'));
      var posZ = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Z'));
      geom.vertices.push(new THREE.Vector3(posX, posY, posZ));
    }

    for (var index = 0; index < geom.vertices.length; index += 3)
      geom.faces.push(new THREE.Face3(3 * index / 3 + 0, 3 * index / 3 + 1, 3 * index / 3 + 2));

    geom.computeBoundingBox();
    this.SetBoundingBox(geom.boundingBox);
    for (var i = 0; i < data.find('UVArray').find('uv').length; i += 3) {
      var u1 = parseFloat($(data.find('UVArray').find('uv')[i + 0]).attr('u'));
      var v1 = parseFloat($(data.find('UVArray').find('uv')[i + 0]).attr('v'));

      var u2 = parseFloat($(data.find('UVArray').find('uv')[i + 1]).attr('u'));
      var v2 = parseFloat($(data.find('UVArray').find('uv')[i + 1]).attr('v'));

      var u3 = parseFloat($(data.find('UVArray').find('uv')[i + 2]).attr('u'));
      var v3 = parseFloat($(data.find('UVArray').find('uv')[i + 2]).attr('v'));

      geom.faceVertexUvs[0].push([new THREE.Vector2(u1, v1),
      new THREE.Vector2(u2, v2),
      new THREE.Vector2(u3, v3)]);
    }

    geom.computeFaceNormals();
    geom.verticesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    let strPaveImage = data.find('SourceImage').attr('src');

    var tMaterial = new THREE.MeshPhongMaterial({ side: THREE.FrontSide });

    let strImageURL = '';

    //读取场景中地面贴图带texture,点击地面铺贴时贴图路径没有带texture
    if (-1 == strPaveImage.indexOf('texture')) {
      strImageURL = m_strHttp + "texture/" + strPaveImage;
    }
    else {
      strImageURL = m_strHttp + strPaveImage;
    }

    var texture = new THREE.TextureLoader().load(strImageURL);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    tMaterial.map = texture;
    tMaterial.needsUpdate = true;
    var tMesh = new THREE.Mesh(geom, tMaterial);
    tMesh.rotation.x = -Math.PI / 2;
    scene3D.add(tMesh);
    this.mRenderFloor.push(tMesh);
  }

  this.SetBoundingBox = function (box3) {
    if (box3.max.x > this.m_BOX.max.x) {
      this.m_BOX.max.x = box3.max.x;
    }

    if (box3.max.y > this.m_BOX.max.y) {
      this.m_BOX.max.y = box3.max.y;
    }

    if (box3.min.x < this.m_BOX.min.x) {
      this.m_BOX.min.x = box3.min.x;
    }

    if (box3.min.y < this.m_BOX.min.y) {
      this.m_BOX.min.y = box3.min.y;
    }
  }

  this.OnLoadCeilingTop = function (data) {
    var geom = new THREE.Geometry();
    // 得到顶点数据
    for (var i = 0; i < data.find('PosArray').find('pos').length; i++) {
      var posX = parseFloat($(data.find('PosArray').find('pos')[i]).attr('X'));
      var posY = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Y'));
      var posZ = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Z'));
      geom.vertices.push(new THREE.Vector3(posX, posY, posZ));
    }

    for (var index = 0; index < geom.vertices.length; index += 3)
      geom.faces.push(new THREE.Face3(3 * index / 3 + 0, 3 * index / 3 + 1, 3 * index / 3 + 2));

    for (var i = 0; i < data.find('UVArray').find('uv').length; i += 3) {
      var u1 = parseFloat($(data.find('UVArray').find('uv')[i + 0]).attr('u'));
      var v1 = parseFloat($(data.find('UVArray').find('uv')[i + 0]).attr('v'));

      var u2 = parseFloat($(data.find('UVArray').find('uv')[i + 1]).attr('u'));
      var v2 = parseFloat($(data.find('UVArray').find('uv')[i + 1]).attr('v'));

      var u3 = parseFloat($(data.find('UVArray').find('uv')[i + 2]).attr('u'));
      var v3 = parseFloat($(data.find('UVArray').find('uv')[i + 2]).attr('v'));

      geom.faceVertexUvs[0].push([new THREE.Vector2(u1, v1),
      new THREE.Vector2(u2, v2),
      new THREE.Vector2(u3, v3)]);
    }

    geom.computeFaceNormals();
    geom.verticesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    let strPaveImage = data.find('SourceImage').attr('src');
    //	this.m_TransPaveImageWidth 	  = data.find('PaveImage').attr('length');		// 贴图宽
    //	this.m_TransPaveImageHeight	  = data.find('PaveImage').attr('width');		// 贴图高

    var tMaterial = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
    var texture = new THREE.TextureLoader().load('../' + strPaveImage);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    tMaterial.map = texture;
    tMaterial.needsUpdate = true;
    var tMesh = new THREE.Mesh(geom, tMaterial);
    tMesh.rotation.x = -Math.PI / 2;
    scene3D.add(tMesh);
    this.mRenderCeilingTop.push(tMesh);
  }



  this.OnLoadCeiling = function (data) {
    //顶面
    var geom = new THREE.Geometry();
    // 得到顶点数据
    for (var i = 0; i < data.find('PosArray').find('pos').length; i++) {
      var posX = parseFloat($(data.find('PosArray').find('pos')[i]).attr('X'));
      var posY = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Y'));
      var posZ = parseFloat($(data.find('PosArray').find('pos')[i]).attr('Z'));
      geom.vertices.push(new THREE.Vector3(posX, posY, posZ));
    }

    for (var index = 0; index < geom.vertices.length; index += 3)
      geom.faces.push(new THREE.Face3(3 * index / 3 + 0, 3 * index / 3 + 1, 3 * index / 3 + 2));

    for (var i = 0; i < data.find('UVArray').find('uv').length; i += 3) {
      var u1 = parseFloat($(data.find('UVArray').find('uv')[i + 0]).attr('u'));
      var v1 = parseFloat($(data.find('UVArray').find('uv')[i + 0]).attr('v'));

      var u2 = parseFloat($(data.find('UVArray').find('uv')[i + 1]).attr('u'));
      var v2 = parseFloat($(data.find('UVArray').find('uv')[i + 1]).attr('v'));

      var u3 = parseFloat($(data.find('UVArray').find('uv')[i + 2]).attr('u'));
      var v3 = parseFloat($(data.find('UVArray').find('uv')[i + 2]).attr('v'));

      geom.faceVertexUvs[0].push([new THREE.Vector2(u1, v1),
      new THREE.Vector2(u2, v2),
      new THREE.Vector2(u3, v3)]);
    }

    geom.computeFaceNormals();
    geom.verticesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    let strPaveImage = data.find('SourceImage').attr('src');
    //	this.m_TransPaveImageWidth 	  = data.find('PaveImage').attr('length');		// 贴图宽
    //	this.m_TransPaveImageHeight	  = data.find('PaveImage').attr('width');		// 贴图高

    var tMaterial = new THREE.MeshPhongMaterial({ side: THREE.FrontSide });			// THREE.DoubleSide
    var texture = new THREE.TextureLoader().load(m_strHttp + 'texture/' + strPaveImage);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    tMaterial.map = texture;
    tMaterial.needsUpdate = true;
    var tMesh = new THREE.Mesh(geom, tMaterial);
    tMesh.rotation.x = -Math.PI / 2;
    scene3D.add(tMesh);
    this.mRenderCeiling.push(tMesh);
  }

  this.OnLoadDoor = function (data) {
    var tObj = new ObjData();
    this.mDoorArray.push(tObj);
    tObj.OnCreate3D1(tObj, data);
  }

  this.OnLoadWindow = function (data) {
    var tObj = new ObjData();
    this.mWindowArray.push(tObj);
    tObj.OnCreate3D1(tObj, data);
  }

  this.OnLoadFurniture = function (data) {
    var tObj = new ObjData();
    this.mFurnitureArray.push(tObj);
    tObj.OnCreate3D(tObj, data);
  }

  this.OnLoadObj = function (data) {
    var geom = new THREE.Geometry();

    let posArray = data.find('PosArray').find('pos');
    let arrayLen = posArray.length;

    // 得到顶点数据
    for (var i = 0; i < arrayLen; i++) {
      var posX = parseFloat($(posArray[i]).attr('X'));
      var posY = parseFloat($(posArray[i]).attr('Y'));
      var posZ = parseFloat($(posArray[i]).attr('Z'));
      geom.vertices.push(new THREE.Vector3(posX, posY, posZ));
    }

    for (var index = 0; index < geom.vertices.length; index += 3)
      geom.faces.push(new THREE.Face3(3 * index / 3 + 0, 3 * index / 3 + 2, 3 * index / 3 + 1));

    geom.computeBoundingBox();
    geom.faceVertexUvs[0] = new Array();

    let uvData = data.find('UVArray').find('uv');
    let uvLen = uvData.length;

    for (var i = 0; i < uvLen; i += 3) {
      var u1 = parseFloat($(uvData[i + 0]).attr('u'));
      var v1 = parseFloat($(uvData[i + 0]).attr('v'));
      var u3 = parseFloat($(uvData[i + 1]).attr('u'));
      var v3 = parseFloat($(uvData[i + 1]).attr('v'));
      var u2 = parseFloat($(uvData[i + 2]).attr('u'));
      var v2 = parseFloat($(uvData[i + 2]).attr('v'));

      geom.faceVertexUvs[0].push([new THREE.Vector2(u1, v1), new THREE.Vector2(u2, v2), new THREE.Vector2(u3, v3)]);
    }

    geom.computeFaceNormals();
    geom.verticesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    let strImage = data.find('Image').attr('src');

    if ("" != strImage) {
      var tImageTex = new THREE.TextureLoader().load(strImage);

      tImageTex.wrapS = tImageTex.wrapT = THREE.RepeatWrapping;

      var tMat = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: tImageTex,
      });

      var tMesh = new THREE.Mesh(geom, tMat);
      //tMesh.rotation.x = -Math.PI/2;
      if (tMesh && tMesh.geometry.vertices.length > 0) {
        scene3D.add(tMesh);
        this.mCustomMessArray.push(tMesh);
      }
    }
  }

  this.OnLoadAnimationMatrix = function (data) {
    m_AnimationClass.OnLoadAnimationMatrix(data);
  }

  this.HideAllCeiling = function () {
    for (var i = 0; i < this.mFurnitureArray.length; i++) {
      if (270 < this.mFurnitureArray[i].m_fHight) {
        this.mFurnitureClass.mFurnitureArray[i].OnShow(false);
      }
    }
  }

  this.OnPick3D_Obj = function () {
    var tObj = null;
    var tDis = 9999999;
    for (var i = 0; i < mHouseClass.mFurnitureArray.length; i++) {
      if (this.mFurnitureArray[i].m_Object) {
        var Intersections = raycaster.intersectObject(this.mFurnitureArray[i].m_Object, true);
        if (Intersections.length > 0) {
          if (tDis > Intersections[0].distance)	// 距离最近
          {
            tDis = Intersections[0].distance;
            tObj = this.mFurnitureArray[i];
          }
        }
      }
    }

    if (tObj) {
      var strIconPath = tObj.m_infoXML.find('Furniture3D').attr('source');
      var k = strIconPath.lastIndexOf(".");
      var strJpg = m_strHttp + "jiaju/" + strIconPath.slice(0, k + 1) + "jpg";

      mHouseClass.m_pCurObj = tObj;
      app.obj.bEnable = tObj.m_Object.visible;	// 是否使用		  	
      $("#mObjIcon").attr('src', strJpg);
      $(".sun_block").hide();
      $("#obj").show();

      //浩思云及苏州小丑鱼，点击模型时可以设置模型上舞台灯效果
      if (m_strWebService == 'http://www.ihouse3d.com.cn/' || m_strWebService == 'http://3d.i3dtu.com/') {
        this.SetWutaiLightInfo(mHouseClass.m_pCurObj);
        OnShowWutaiLight();
      }
    }
  };

  this.SetWutaiLightInfo = function (m_pCurObj) {
    //舞台灯类型
    if (1 == m_pCurObj.m_ModeType) {
      app.attributeInterface.furniture.light_hotspot.int = parseInt(m_pCurObj.m_Hotspot * 1000);
      app.attributeInterface.furniture.light_fallsize.int = parseInt(m_pCurObj.m_Fallsize * 1000);
      app.attributeInterface.furniture.light_intensity.int = parseInt(m_pCurObj.m_Intensity / 1000);

      let color = `rgb(${m_pCurObj.m_LightR * 255},${m_pCurObj.m_LightG * 255},${m_pCurObj.m_LightB * 255})`;
      app.attributeInterface.furniture.stageLightColor = this.colorRGBtoHex(color);

      app.attributeInterface.furniture.stageLight_checked = true;
      app.attributeInterface.furniture.light_projector_map = m_pCurObj.m_ProjectorMap;

      app.attributeInterface.furniture.Xaxis.int = parseInt(m_pCurObj.m_Object.rotation.x * 180 / Math.PI);
      app.attributeInterface.furniture.Yaxis.int = parseInt(m_pCurObj.m_Object.rotation.y * 180 / Math.PI);
    }
    else {
      app.attributeInterface.furniture.light_hotspot.int = 350;
      app.attributeInterface.furniture.light_fallsize.int = 385;
      app.attributeInterface.furniture.light_intensity.int = 500;

      app.attributeInterface.furniture.Xaxis.int = -90;
      app.attributeInterface.furniture.Yaxis.int = 0;

      let color = `rgb(255,255,255)`;
      app.attributeInterface.furniture.stageLightColor = this.colorRGBtoHex(color);
      app.attributeInterface.furniture.stageLight_checked = false;
      app.attributeInterface.furniture.light_projector_map = '';
    }

    //设置照射地面效果图片
    this.SetProjectorMap();

    //界面灯光按钮状态更新
    this.OnUseStageLight();
  }

  this.SetProjectorMap = function () {
    $('.body-wutai-light-list-img li').removeClass('body-item-img').children("i").remove();
    let projectorMap = app.attributeInterface.furniture.light_projector_map;
    if ("" != projectorMap) {
      let index = parseInt(projectorMap);
      $('.body-wutai-light-list-img li').eq(index).addClass('body-item-img').append('<i class="el-icon-check"></i>');
    }
  }

  this.OnUseStageLight = function () {
    mHouseClass.m_pCurObj.m_ModeType = app.attributeInterface.furniture.stageLight_checked ? 1 : 0;
    app.attributeInterface.furniture.light_hotspot.disabled = !app.attributeInterface.furniture.stageLight_checked;
    app.attributeInterface.furniture.light_fallsize.disabled = !app.attributeInterface.furniture.stageLight_checked;
    app.attributeInterface.furniture.light_intensity.disabled = !app.attributeInterface.furniture.stageLight_checked;
    app.attributeInterface.furniture.Xaxis.disabled = !app.attributeInterface.furniture.stageLight_checked;
    app.attributeInterface.furniture.Yaxis.disabled = !app.attributeInterface.furniture.stageLight_checked;

    if (1 == mHouseClass.m_pCurObj.m_ModeType) {
      $(".wutai-light .body-list-item").show();
    }
    else {
      $(".wutai-light .body-list-item").hide();
    }
  }

  this.colorRGBtoHex = function (color) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
  };

  this.OnShowAllObj = function () {
    for (var i = 0; i < mHouseClass.mHideObjArray.length; i++)
      mHouseClass.mHideObjArray[i].m_Object.visible = true;
  };

  this.OnSaveLight = function () {
    let strXML = '<root>';
    strXML += mLightClass.OnSaveLight();
    strXML += '</root>';

    let base64Data = base64_encode(encodeURIComponent(strXML));
    this.SaveStorageData(base64Data);
  }

  this.SaveStorageData = function (base64Data) {
    $.ajax({
      url: m_strWebService + 'Service1.asmx/StorageData',
      type: "post",
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      data:
      {
        Basse64Data: base64Data,
        UUID: m_SceneUUID
      },
      success: function (data) {
        if ("1" == data.code) {
          alert('保存成功');

          if (window.opener && window.opener.mPluginsClass.mSceneLightUUID) {
            window.opener.mHouseClass.mPlaneLightClass.OnLoadStorageLight();
          }
        }
      },
      error: function (err) {
        return false;
      }
    });
  }

  this.ShowCameraList = function () {
    if (window.opener.mPluginsClass.mJsonData == null)	// 有视角数据
    {
      $("#cameraList").hide();
      return;
    }
    if (window.opener.mPluginsClass.mJsonData != '') {
      var tJson = JSON.parse(window.opener.mPluginsClass.mJsonData);

      app.CameraList.tableData = [];
      for (var i = 0; i < tJson.length; i++) {

        app.CameraList.tableData[i] = {};
        app.CameraList.tableData[i].name = '相机' + i;
        app.CameraList.tableData[i].x = parseInt(tJson[i].mPos.x);
        app.CameraList.tableData[i].y = parseInt(tJson[i].mPos.y);
        app.CameraList.tableData[i].z = parseInt(tJson[i].mPos.z);
      }
    }

    if ($("#cameraList").css('display') == 'block') {
      $("#cameraList").hide();
    } else {
      $("#cameraList").show();
    }
  }

  this.UpdateCamera = function (iIndex) {
    if (iIndex == -1)
      return;

    var tJson = JSON.parse(window.opener.mPluginsClass.mJsonData);

    camera.position.x = tJson[iIndex].mPos.x;
    camera.position.y = tJson[iIndex].mPos.y;
    camera.position.z = tJson[iIndex].mPos.z;

    var tLookAt = new THREE.Vector3(tJson[iIndex].mLookAt.x,
      tJson[iIndex].mLookAt.y,
      tJson[iIndex].mLookAt.z);


    controls.center.x = camera.position.x;
    controls.center.y = camera.position.y;
    controls.center.z = camera.position.z;
    controls.target = tLookAt;


    camera.rotation.x = 0;
    camera.rotation.y = 0;
    camera.rotation.z = 0;

    camera.scale.x = 1;
    camera.scale.y = 1;
    camera.scale.z = 1;
    camera.matrixWorld.identity();
    camera.matrix.identity();

    camera.lookAt(tLookAt);
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.fov = tJson[iIndex].hfov;
    camera.updateProjectionMatrix();
    render();
  }

}

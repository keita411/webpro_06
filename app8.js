"use strict";
const express = require("express");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db2', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.redirect('/public/keiyo_add.html');
});

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

// Create
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {data: detail} );
});

// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice( req.params.number, 1 );
  res.redirect('/keiyo2' );
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.render('keiyo2', {data: station2} );
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});


// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log( station2 );
  res.redirect('/keiyo2' );
});


//  任天堂ハード一覧システム (Nintendo System)


let nintendo_hard = [
  { id: 1, name: "Nintendo Switch", hard: "1億4,604万台", soft: "13億610万本", date: "2017年3月3日" },
  { id: 2, name: "ニンテンドー3DS", hard: "7,594万台", soft: "3億9,198万本", date: "2011年2月26日" },
  { id: 3, name: "Wii U", hard: "1,356万台", soft: "1億358万本", date: "2012年12月8日" },
  { id: 4, name: "Wii", hard: "1億163万台", soft: "9億2,185万本", date: "2006年12月2日" },
  { id: 5, name: "ニンテンドーDS", hard: "1億5,402万台", soft: "9億4,876万本", date: "2004年12月2日" },
  { id: 6, name: "ゲームボーイアドバンス", hard: "8,151万台", soft: "3億7,742万本", date: "2001年3月21日" },
  { id: 7, name: "ニンテンドー ゲームキューブ", hard: "2,174万台", soft: "2億857万本", date: "2001年9月14日" },
  { id: 8, name: "NINTENDO64", hard: "3,293万台", soft: "2億2,497万本", date: "1996年6月23日" },
  { id: 9, name: "スーパーファミコン", hard: "4,910万台", soft: "3億7,906万本", date: "1990年11月21日" },
  { id: 10, name: "ファミリーコンピュータ", hard: "6,191万台", soft: "5億10万本", date: "1983年7月15日" }
];

// 1. 一覧表示
app.get("/nintendo", (req, res) => {
    res.render('nintendo', { data: nintendo_hard });
});

// 2. 新規登録画面への移動
app.get("/nintendo/create", (req, res) => {
    res.redirect("/public/nintendo_new.html");
});

// 3. 新規登録処理
app.post("/nintendo", (req, res) => {
    const maxId = nintendo_hard.reduce((max, item) => Math.max(max, item.id), 0);
    const newItem = {
        id: maxId + 1,
        name: req.body.name,
        hard: req.body.hard,
        soft: req.body.soft,
        date: req.body.date 
    };
    nintendo_hard.push(newItem);
    res.redirect('/nintendo');
});

// 4. 詳細表示
app.get("/nintendo/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = nintendo_hard.find(i => i.id === id);
    if (item) {
        res.render('nintendo_detail', { data: item });
    } else {
        res.send("データが見つかりません");
    }
});

// 5. 編集画面表示
app.get("/nintendo/edit/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = nintendo_hard.find(i => i.id === id);
    if (item) {
        res.render('nintendo_edit', { data: item });
    } else {
        res.send("データが見つかりません");
    }
});

// 6. 更新処理
app.post("/nintendo/update/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = nintendo_hard.findIndex(i => i.id === id);
    if (index !== -1) {
        nintendo_hard[index].name = req.body.name;
        nintendo_hard[index].hard = req.body.hard;
        nintendo_hard[index].soft = req.body.soft;
        nintendo_hard[index].date = req.body.date;
    }
    res.redirect('/nintendo');
});

// 7. 削除確認画面表示
app.get("/nintendo/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = nintendo_hard.find(i => i.id === id);
    if (item) {
        res.render('nintendo_delete', { data: item });
    } else {
        res.send("データが見つかりません");
    }
});

// 8. 削除実行処理
app.post("/nintendo/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    nintendo_hard = nintendo_hard.filter(i => i.id !== id);
    res.redirect('/nintendo');
});

//  PlayStation システム

let ps_hard = [
  { id: 1, name: "PlayStation 5", hard: "6,550万台", soft: "非公開", date: "2020/11/12" },
  { id: 2, name: "PlayStation 4", hard: "1億1,720万台", soft: "11億8,600万本", date: "2014/02/22" },
  { id: 3, name: "PlayStation 3", hard: "8,740万台", soft: "9億9,940万本", date: "2006/11/11" },
  { id: 4, name: "PlayStation 2", hard: "1億5,500万台", soft: "15億3,700万本", date: "2000/03/04" },
  { id: 5, name: "PlayStation", hard: "1億240万台", soft: "9億6,200万本", date: "1994/12/03" },
  { id: 6, name: "PSP", hard: "7,640万台", soft: "3億3,100万本", date: "2004/12/12" },
  { id: 7, name: "PS Vita", hard: "1,600万台", soft: "非公開", date: "2011/12/17" }
];

// 1. 一覧表示画面
app.get("/ps", (req, res) => {
    res.render("ps", { data: ps_hard });
});

// 2. 新規登録画面への移動
app.get("/ps/create", (req, res) => {
    // 登録用HTMLを表示（ファイル名は ps_new.html と仮定）
    res.redirect("/public/ps_new.html");
});

// 3. 新規登録処理
app.post("/ps", (req, res) => {
    // IDの自動採番（ps_hardの中で一番大きいIDを探して +1 する）
    const maxId = ps_hard.reduce((max, item) => Math.max(max, item.id), 0);
    
    const newItem = {
        id: maxId + 1,
        name: req.body.name,
        hard: req.body.hard,
        soft: req.body.soft,
        date: req.body.date 
    };
    
    ps_hard.push(newItem); // 配列に追加
    res.redirect('/ps');   // 一覧画面に戻る
});

// 4. 詳細表示
app.get("/ps/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = ps_hard.find(i => i.id === id);
    if (item) {
        res.render('ps_detail', { data: item }); // ps_detail.ejs を表示
    } else {
        res.send("データが見つかりません");
    }
});

// 5. 編集画面表示
app.get("/ps/edit/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = ps_hard.find(i => i.id === id);
    if (item) {
        res.render('ps_edit', { data: item }); // ps_edit.ejs を表示
    } else {
        res.send("データが見つかりません");
    }
});

// 6. 更新処理
app.post("/ps/update/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = ps_hard.findIndex(i => i.id === id);
    
    if (index !== -1) {
        ps_hard[index].name = req.body.name;
        ps_hard[index].hard = req.body.hard;
        ps_hard[index].soft = req.body.soft;
        ps_hard[index].date = req.body.date;
    }
    res.redirect('/ps');
});

// 7. 削除確認画面表示
app.get("/ps/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = ps_hard.find(i => i.id === id);
    if (item) {
        res.render('ps_delete', { data: item }); // ps_delete.ejs を表示
    } else {
        res.send("データが見つかりません");
    }
});

// 8. 削除実行処理
app.post("/ps/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    // 指定したID以外を残す（＝指定したIDを削除する）
    ps_hard = ps_hard.filter(i => i.id !== id);
    res.redirect('/ps');
});

// ストリートファイター6 キャラクター管理システム

let sf6_chars = [
  { id: 1, name: "ルーク", type: "スタンダード", height: "185cm", weight: "90kg", likes: "PCゲーム、とんこつラーメン", dislikes: "ホラーゲーム", birth: "11月17日" },
  { id: 2, name: "ジェイミー", type: "トリッキー", height: "174cm", weight: "77kg", likes: "ユン・ヤン、ダンス、師匠", dislikes: "説教、生意気な奴", birth: "6月22日" },
  { id: 3, name: "リュウ", type: "スタンダード", height: "175cm", weight: "85kg", likes: "武道、水ようかん", dislikes: "クモ", birth: "7月21日" },
  { id: 4, name: "ケン", type: "スタンダード", height: "175cm", weight: "83kg", likes: "家族、パスタ", dislikes: "梅干し、オペラ", birth: "2月14日" },
  { id: 5, name: "春麗", type: "スピード", height: "169cm", weight: "秘密", likes: "果物、洋菓子", dislikes: "犯罪、煮え切らない人", birth: "3月1日" },
  { id: 6, name: "ガイル", type: "スタンダード", height: "182cm", weight: "99kg", likes: "アメリカンコーヒー", dislikes: "日本でリュウに食べさせられた納豆", birth: "12月23日" },
  { id: 7, name: "キャミィ", type: "スピード", height: "164cm", weight: "61kg", likes: "ネコ、格闘データの収集", dislikes: "不機嫌な時の全て", birth: "1月6日" },
  { id: 8, name: "エドモンド本田", type: "パワー", height: "185cm", weight: "137kg", likes: "風呂、ちゃんこ鍋、ティラミス", dislikes: "優柔不断", birth: "11月3日" },
  { id: 9, name: "ブランカ", type: "トリッキー", height: "192cm", weight: "98kg", likes: "サマンサ(母)、ブランカちゃん人形", dislikes: "軍隊アリ", birth: "2月12日" },
  { id: 10, name: "ダルシム", type: "トリッキー", height: "176cm", weight: "48kg", likes: "カレー、瞑想", dislikes: "甘いもの、肉", birth: "11月22日" },
  { id: 11, name: "ザンギエフ", type: "パワー", height: "214cm", weight: "181kg", likes: "レスリング、コサックダンス", dislikes: "波動拳などの飛び道具", birth: "6月1日" },
  { id: 12, name: "マリーザ", type: "パワー", height: "203cm", weight: "122kg", likes: "宝石、パンケーキ", dislikes: "高いところ", birth: "9月26日" },
  { id: 13, name: "マノン", type: "パワー", height: "175cm", weight: "58kg", likes: "金色、化粧、家族", dislikes: "人混み、おしゃべりな人", birth: "9月2日" },
  { id: 14, name: "キンバリー", type: "スピード", height: "168cm", weight: "61kg", likes: "80年代のポップカルチャー", dislikes: "涙もろい映画", birth: "不明" },
  { id: 15, name: "JP", type: "テクニカル", height: "191cm", weight: "97kg", likes: "チェス、投資", dislikes: "服の汚れ、睡眠", birth: "不明" },
  { id: 16, name: "リリー", type: "トリッキー", height: "160cm", weight: "48kg", likes: "カメラ、猛禽類", dislikes: "ウソをつく人、雷", birth: "6月3日" },
  { id: 17, name: "ラシード", type: "スピード", height: "178cm", weight: "85kg", likes: "動画配信、新しいもの", dislikes: "女性との会話、ロード画面", birth: "9月7日" },
  { id: 18, name: "A.K.I.", type: "トリッキー", height: "173cm", weight: "57kg", likes: "蛇、雨、F.A.N.G先生", dislikes: "晴天、先生以外の人", birth: "11月11日" },
  { id: 19, name: "エド", type: "テクニカル", height: "182cm", weight: "86kg", likes: "ボクシング、完全勝利", dislikes: "理想ばかり言う奴、ベガ", birth: "4月16日" },
  { id: 20, name: "豪鬼", type: "スタンダード", height: "178cm", weight: "90kg", likes: "不明", dislikes: "不明", birth: "不明" },
  { id: 21, name: "ベガ", type: "パワー", height: "182cm", weight: "112kg", likes: "世界征服", dislikes: "無能な部下、サイコパワーに耐えられない肉体", birth: "4月17日" },
  { id: 22, name: "テリー", type: "スタンダード", height: "182cm", weight: "83kg", likes: "ビデオゲーム、ヴィンテージジーンズ", dislikes: "ナメクジ", birth: "3月15日" },
  { id: 23, name: "不知火 舞", type: "スピード", height: "165cm", weight: "48kg", likes: "お雑煮、アンディ", dislikes: "クモ", birth: "1月1日" },
  { id: 24, name: "エレナ", type: "トリッキー", height: "183cm", weight: "54kg", likes: "友達、音楽、アイス", dislikes: "靴", birth: "5月12日" },
  { id: 25, name: "サガット", type: "", height: "226cm", weight: "139kg", likes: "強い対戦相手、虎", dislikes: "姑息なヤツ", birth: "7月2日" },
  { id: 26, name: "C.ヴァイパー", type: "テクニカル", height: "175cm", weight: "56kg", likes: "娘との時間、アイスクリームパフェ", dislikes: "残業", birth: "7月18日" }
];


// 1. 一覧表示
app.get("/sf6", (req, res) => {
    res.render('sf6', { data: sf6_chars });
});

// 2. 新規登録画面への移動
app.get("/sf6/create", (req, res) => {
    res.redirect("/public/sf6_new.html");
});

// 3. 新規登録処理
app.post("/sf6", (req, res) => {
    const maxId = sf6_chars.reduce((max, item) => Math.max(max, item.id), 0);
    const newItem = {
        id: maxId + 1,
        name: req.body.name,
        type: req.body.type,
        height: req.body.height,
        weight: req.body.weight,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        birth: req.body.birth
    };
    sf6_chars.push(newItem);
    res.redirect('/sf6');
});

// 4. 詳細表示
app.get("/sf6/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = sf6_chars.find(i => i.id === id);
    if (item) {
        res.render('sf6_detail', { data: item });
    } else {
        res.send("データが見つかりません");
    }
});

// 5. 編集画面表示
app.get("/sf6/edit/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = sf6_chars.find(i => i.id === id);
    if (item) {
        res.render('sf6_edit', { data: item });
    } else {
        res.send("データが見つかりません");
    }
});

// 6. 更新処理
app.post("/sf6/update/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = sf6_chars.findIndex(i => i.id === id);
    if (index !== -1) {
        sf6_chars[index].name = req.body.name;
        sf6_chars[index].type = req.body.type;
        sf6_chars[index].height = req.body.height;
        sf6_chars[index].weight = req.body.weight;
        sf6_chars[index].likes = req.body.likes;
        sf6_chars[index].dislikes = req.body.dislikes;
        sf6_chars[index].birth = req.body.birth;
    }
    res.redirect('/sf6');
});

// 7. 削除確認画面表示
app.get("/sf6/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = sf6_chars.find(i => i.id === id);
    if (item) {
        res.render('sf6_delete', { data: item });
    } else {
        res.send("データが見つかりません");
    }
});

// 8. 削除実行処理
app.post("/sf6/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    sf6_chars = sf6_chars.filter(i => i.id !== id);
    res.redirect('/sf6');
});



app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win ) || 0;
  let draw = Number( req.query.draw ) || 0;
  let lose = Number( req.query.lose ) || 0;
  let total = Number( req.query.total ) || 0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
   if (
    (hand == 'グー' && cpu == 'チョキ') ||
    (hand == 'チョキ' && cpu == 'パー') ||
    (hand == 'パー' && cpu == 'グー')
  ){
  judgement = '勝ち';
  win += 1;
  total += 1;
  }else if( hand==cpu ){
  judgement = 'あいこ';
  draw += 1;
  total += 1;
  }else{
  judgement = '負け';
  lose += 1;
  total += 1;
  }
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    draw: draw,
    lose: lose,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  })
});

app.get("/add", (req, res) => {
  console.log("GET");
  console.log( req.query );
  const num1 = Number( req.query.num1 );
  const num2 = Number( req.query.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

app.post("/add", (req, res) => {
  console.log("POST");
  console.log( req.body );
  const num1 = Number( req.body.num1 );
  const num2 = Number( req.body.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

// これより下はBBS関係
app.post("/check", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  res.json( {number: bbs.length });
});

app.post("/read", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  const start = Number( req.body.start );
  console.log( "read -> " + start );
  if( start==0 ) res.json( {messages: bbs });
  else res.json( {messages: bbs.slice( start )});
});

app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  console.log( [name, message] );
  // 本来はここでDBMSに保存する
  bbs.push( { name: name, message: message } );
  res.json( {number: bbs.length } );
});

app.get("/bbs", (req,res) => {
    console.log("GET /BBS");
    res.json( {test: "GET /BBS" });
});

app.post("/bbs", (req,res) => {
    console.log("POST /BBS");
    res.json( {test: "POST /BBS"});
})

app.get("/bbs/:id", (req,res) => {
    console.log( "GET /BBS/" + req.params.id );
    res.json( {test: "GET /BBS/" + req.params.id });
});

app.put("/bbs/:id", (req,res) => {
    console.log( "PUT /BBS/" + req.params.id );
    res.json( {test: "PUT /BBS/" + req.params.id });
});

app.delete("/bbs/:id", (req,res) => {
    console.log( "DELETE /BBS/" + req.params.id );
    res.json( {test: "DELETE /BBS/" + req.params.id });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));


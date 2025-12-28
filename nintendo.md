flowchart TD
    %% ノード（画面）の定義
    %% 書き方: ID["画面に表示する文字"]
    Start((アクセス))
    List["/ps<br>（一覧画面）"]
    New["/public/ps_new.html<br>（新規登録画面）"]
    Detail["/ps/:id<br>（詳細画面）"]
    Edit["/ps/edit/:id<br>（編集画面）"]
    Delete["/ps/delete/:id<br>（削除確認画面）"]

    %% 全体の流れ
    Start --> List

    %% 1. 新規登録の流れ
    subgraph 新規登録
    List -- "追加ボタン" --> New
    New -- "登録(POST)" --> List
    New -. "戻る" .-> List
    end

    %% 2. 詳細表示の流れ
    List -- "ハード名リンク" --> Detail
    Detail -. "戻る" .-> List

    %% 3. 編集の流れ
    subgraph 編集処理
    Detail -- "編集ボタン" --> Edit
    Edit -- "更新(POST)" --> List
    Edit -. "キャンセル" .-> Detail
    end

    %% 4. 削除の流れ
    subgraph 削除処理
    Detail -- "削除ボタン" --> Delete
    Delete -- "実行(POST)" --> List
    Delete -. "やめる" .-> Detail
    end

    %% スタイルの調整（見やすくするため）
    style List fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style Start fill:#fff,stroke:#333,stroke-width:1px
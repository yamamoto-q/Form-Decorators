(function($) {
    var DATA_KEY = "buttoninput", $me, settings;

    // 関数のマッピング
    var _methods = {
        my_sample_method: _my_sample_method
    }

    // 関数
    function _my_sample_method() {
        console.info("_my_sample_method");
        console.group();
        console.info("arguments", arguments);
        console.info("me", $me);
        console.info("settings", settings);
        console.info("data-" + DATA_KEY, $me.data(DATA_KEY));
        console.groupEnd()
        return this;
    }

    // プラグイン定義
    var Plugin = $.fn.buttoninput = function(config) {

        // プラグイン実行時、普通、引数はオプション（Object）。
        // String である場合には関数実行とみなす
        if (typeof config === 'string') {
            var elmPlugin = $(this).data(DATA_KEY); // エレメントに格納されたプラグインを得る
            if (typeof elmPlugin.methods[config] === "undefined") {
                // 無いばあいはエラー
                throw new Error('No method named "' + config + '"');
            } else {
                // 関数がある場合
                var args = Array.prototype.slice.call(arguments); // 引数を得て...　
                args.shift(); // 最初に一個目（config）はいらない
                elmPlugin.methods[config].apply(elmPlugin, args); // メソッドチェーン、引数を渡し、実行
            }
            return;
        }

        // ** 最初に実行される **
        // 引数が String ではないとき
        $me = $(this);
        var me_ID = $me.attr("id");

        settings = $.extend({
            'id': null,
            'overwrite' : false,
            'values' : ['JAPAN', 'USA']
        }, config);



        for (var i = 0; i < settings.values.length; i++) {
            var value = values[i];
            $me.after('<button type="button" class="' + me_ID + '-buttoninput" data-value="' + value + '">' + value + '</button>');
        }
        

        Plugin.methods = _methods;
        $me.data(DATA_KEY, Plugin);// ミソ：エレメントの data-* にプラグインを格納
        return Plugin;
    };

})(jQuery);
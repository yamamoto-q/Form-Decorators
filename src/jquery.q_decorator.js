(function($) {
    var Plugin = $.fn.buttoninput = function(config) {
        $me = $(this);
        var me_name = $me.attr("name");
        var btn_id_prefix = me_name.replace(/\[|\]/gi, "");
        console.log(btn_id_prefix);

        settings = $.extend({
            'overwrite' : false,
            'values' : ['JAPAN', 'USA'],
            'separator':','
        }, config);

        for (var i = 0; i < settings.values.length; i++) {
            var value = settings.values[i];
            var btn_id = btn_id_prefix + '-buttoninput-' + i;

            var $Btn = $('<button type="button" id="' + btn_id + '" class="' + me_name + '-buttoninput buttoninput" data-value="' + value + '" data-target="' + me_name + '" data-overwrite="' + settings.overwrite + '">' + value + '</button>');
            $Btn.click(function(event) {
                var value = $(this).data("value");
                var target = $(this).data("target");
                var overwrite = $(this).data("overwrite");
                var $target = $("input[name='" + target + "']");

                console.log(overwrite);
                if(settings.overwrite){
                    $target.val(value);
                }else{
                    var nowValue = $target.val();
                    var nowValues = nowValue.split(settings.separator);
                    nowValues.push(value);
                    $target.val(nowValues.join(settings.separator));
                }
            });
            $me.after($Btn);
        }


        return Plugin;
    };

    //console.log("onLoadButtoninput");
    $("body").trigger("onLoadButtoninput");
})(jQuery);
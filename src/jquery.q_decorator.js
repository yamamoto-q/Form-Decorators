(function($) {
    var Plugin = $.fn.buttoninput = function(config) {
        $me = $(this);
        var me_name = $me.attr("name");

        settings = $.extend({
            'overwrite' : false,
            'values' : ['JAPAN', 'USA'],
            'separator':','
        }, config);

        for (var i = 0; i < settings.values.length; i++) {
            var value = settings.values[i];
            $me.after('<button type="button" id="' + me_name + '-buttoninput-' + i + '" class="' + me_name + '-buttoninput buttoninput" data-value="' + value + '" data-target="' + me_name + '">' + value + '</button>');
        }

        $('.buttoninput').click(function(event) {
            var value = $(this).data("value");
            var target = $(this).data("target");
            var $target = $("input[name='" + target + "']");
            //console.log($(this), value, target, $target);
            if(settings.overwrite){
                $target.val(value);
            }else{
                var nowValue = $target.val();
                var nowValues = nowValue.split(settings.separator);
                nowValues.push(value);
                $target.val(nowValues.join(settings.separator));
            }
        });
        
        return Plugin;
    };

    //console.log("onLoadButtoninput");
    $("body").trigger("onLoadButtoninput");
})(jQuery);
$(document).ready(function () {
        var dataInput = [];
        if (localStorage.getItem('dataInput')) {
                var out = JSON.parse(localStorage.getItem('dataInput'));
                $(out).each(function (index, value) {
                        index = index + 1
                        console.log(value) 
                        var subheading_heading = $(this).text()
                        console.log(subheading_heading)
                        $('main').append('<section><h1>' + value.title + '</h1><button class="btn-cross" id="second" onclick="removeItem(this)">X</button></section>')
                        $('.Head1 select').append("<option value=" + index + ">" + value.title + "</option>")
                        $('.head_2 select').append("<option value=" + index + ">" + value.title + "</option>")
                        $(value.subheading).each(function (index1, value1) {
                                var Head = index
                                var SubHead = index1 + 3;
                                $("main section:nth-child(" + Head + ")").append("<div class='container'><h5>" + value1.subtitle + "</h5><button class='btn-cross' id='second' onclick='removeItem(this)'>X</button></div>");
                                $(value1.form).each(function (index2, value2) {
                                        index2 = index2 + 1;
                                        $("main section:nth-child(" + Head + ") div:nth-child(" + SubHead + ")").append("<p class='input'>" + value2 + " </p>");
                                })
                        })
                }) 
        }

        $(".head_category").submit(function (event) {
                event.preventDefault();
                var textinput = $(".heading_form").val();
                console.log(textinput)
                $('main').append('<section><h1>' + textinput + '</h1><button class="btn-cross" id="second" onclick="removeItem(this)">X</button></section>');
                $('.sub_category option').remove()
                $('.Head1 select ').append("<option value='' selected disabled>--Select Heading--</option>")
                $('.head_2 select option').remove()
                $('.head_2 select ').append("<option value='' selected disabled>--Select Heading--</option>")
                $('main section h1').each(function (key) {
                        key = key + 1
                        console.log(this)
                        var subheading_heading = $(this).text()
                        console.log(subheading_heading)
                        $('.Head1 select').append("<option value=" + key + ">" + subheading_heading + " </option>")
                        $('.head_2 select').append("<option value=" + key + ">" + subheading_heading + "</option>")
                })
                Dataitem();
                $('.head_category')[0].reset();
        });

        $(".sub_category").submit(function (event) {
                event.preventDefault();
                var heading = $('.Head_drp').val();
                var textinput = $(".sub_text").val();
                console.log(textinput, heading)
                $("main section:nth-child(" + heading + ")").append("<div class='container'><h5>" + textinput + "</h5><button class='btn-cross' id='second' onclick='removeItem(this)'>X</button></div>");
                $('.sub_head_1 select option').remove()
                $('.sub_head_1 select ').append("<option value='' selected disabled>--Select Heading--</option>")
                Dataitem();
                $('.sub_category')[0].reset();
                $('main .container h5').each(function (key) {
                        key = key + 1
                        console.log(this)
                        var sub_in_form = $(this).text()
                        console.log(sub_in_form)
                        $('.sub_head_1 select').append("<option value=" + key + ">" + sub_in_form + "</option>")
                })
        });

        $(document).ready(function () {
                $('.form_Head').on('change', function (event) {
                        var h = $(this).val()
                        console.log(h)
                        $('.form_Sub option').remove()
                        $(".form_Sub").append("<option value='' selected disabled>--Select Sub-Heading--</option>")
                        $("main section:nth-child(" + h + ") div h5 ").each(function (key) {
                                key = key + 3
                                console.log(key)
                                var sub_heading = $(this).text()
                                console.log(sub_heading)
                                $('.form_Sub').append("<option value=" + key + ">" + sub_heading + " </option>")
                        })
                })
                $(".form-3").submit(function (event) {
                        event.preventDefault();
                        var heading = $('.form_Head').val();
                        console.log(heading)
                        var sub_heading = $('.form_Sub').val();
                        console.log(sub_heading)
                        var textinput3 = $('.Down').val();
                        var cls = $(".f_class").val();
                        var id = $(".f_id").val();
                        var lbl = $(".f_label").val();
                        var ph = $(".f_placeholder").val();
                        var val = $(".f_value").val();  
                        var nam = $(".f_name").val();
                        var act = $(".f_action").val();
                        var opt = $(".f_option").val();
                        var dis = $(".f_disabled").val();
                        var redo = $(".f_readonly").val();
                        var req = $(".f_required").val();
                        console.log(cls, textinput3, id, lbl, ph, val, nam, act, opt)
                        console.log($(".f_readonly").is(":checked")); 
                        var data = '<lable> ' + lbl + '</lable><br><input type="' + textinput3 + '" class="' + cls + '" id="' + id + '" label="' + lbl + '" placeholder="' + ph + '" value="' + val + '" name="' + nam + '" action="' + act + '" option="' + opt + '" disabled="' + dis + '" readonly="' + redo + '" required="' + req + '"/>'
                        $("main section:nth-child(" + heading + ") div:nth-child(" + sub_heading + ")").append("<p class='input'>" + data + " <br><button class='btn-cross' onclick='removeItem(this)'>X</button></p>");
                        $('.form-3')[0].reset();
                        Dataitem();
                });
        });
});

function Dataitem() {
        dataInput = []
        $('main section').each(function (key) {
                key = key + 1
                var a = $(this).children('h1').text()
                var hmd = []
                $(this).children('div h5').each(function (event) {
                        console.log($(this).text())
                })
                $("main section:nth-child(" + key + ") div").each(function (n) {
                        console.log($(this).text(), a)
                        var Sub_H = $(this).children('h5').text()
                        var shmd = []
                        n = n + 3
                        $("main section:nth-child(" + key + ") div:nth-child(" + n + ") p").each(function () {
                                shmd.push(([$(this).html()]))
                        })
                        hmd.push({ subtitle: Sub_H, form: shmd })
                })
                dataInput.push({ 'title': a, 'subheading': hmd })
                localStorage.setItem('dataInput', JSON.stringify(dataInput));
                localStorage.getItem('dataInput', JSON.stringify(dataInput));
        })
}

$(function (event) {
        $("main").sortable({
                connectWith: "main",
                update: function (event, ui) {
                        Dataitem();
                }
        });
        $("section").sortable({
                connectWith: "section",
                cancel: "h1",
                update: function (event, ui) {
                        Dataitem();
                }
         });
        $(".container").sortable({
                connectWith: "div",
                cancel: "h5 , #second  ",
                update: function (event, ui) {
                        Dataitem();
                }
        });
        $("main section").disableSelection();
        Dataitem();
});
function removeItem(Dlt) {
        $(Dlt).parent().remove();
        Dataitem();
}
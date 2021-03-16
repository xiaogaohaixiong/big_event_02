$(function () {
    // 1.文章类别列表展示
    initArtCateList();
    // 封装函数
    function initArtCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            data: {},
            success: (res) => {
                // console.log(res);
                let htmlStr = template('tpl-art-cate', { data: res.data })
                $('tbody').html(htmlStr);
            }
        })
    }
})
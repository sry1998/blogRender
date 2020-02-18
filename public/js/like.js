$(document).ready(function() {
  $("button[name=like], button[name=unlike]").click(function (e) {  
    e.preventDefault();
    let id = this.id;
    const postid = $(`#postid${id}`).val();
    console.log(postid,"post");
    const user = $('#userid').val();
    const btn = $(this).val();
    console.log(btn)
    if(id !== '') {

      $.ajax({
        type: 'POST',
        url: '/like',
        dataType: 'json',
        data: {postid: id, btnValue: btn},
        success: function(data) {
          console.log(data,"data");
          if(data.postid == id && data.userid == user && data.status == 'deleted') {            
            $(`#${id}`).text('Like');
            $(`#${id}`).val('Like');            
          }
          else if(data.postid == id && data.userid == user){
            $(`#${id}`).text('Unlike');
            $(`#${id}`).val('Unlike');
          }
        }
      })
    }
  })
})

$(document).ready(function() {
  $("button[name=like], button[name=unlike]").click(function (e) {  
    e.preventDefault();
    let id = this.id;
    console.log(postid,"post");
    const user = $('#userid').val();
    const btn = $(this).val();
    let count = parseInt($(`#count${id}`).text());
    console.log(count);
    console.log(btn)
    if(id !== '') {
      $.ajax({
        type: 'POST',
        url: `/users/${user}/posts/${id}/like`,
        dataType: 'json',
        data: {postid: id, btnValue: btn},
        success: function(data) {
          console.log(data,"data");
          if(data.postid == id && data.userid == user && data.status == 'deleted') {            
            $(`#${id}`).text('Like');
            $(`#${id}`).val('Like'); 
            count = count - 1;
            $(`#count${id}`).text(count)           
          }
          else if(data.postid == id && data.userid == user){
            $(`#${id}`).text('Unlike');
            $(`#${id}`).val('Unlike');
            count = count + 1;
            $(`#count${id}`).text(count)  
          }
        }
      })
    }
  })
})

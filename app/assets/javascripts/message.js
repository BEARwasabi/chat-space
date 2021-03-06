$(function() {
  function buildHTML(message) {
    if (message.image) {
      var html = 
        `<div class="message">
          <div class="message__content">
            <div class="message__content__user-name">
              ${message.user_name}
            </div>
            <div class="message__content__user-date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__user-comment">
            <p>
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
        var html = 
          `<div class="message">
            <div class="message__content">
              <div class="message__content__user-name">
                ${message.user_name}
              </div>
              <div class="message__content__user-date">
                ${message.created_at}
              </div>
            </div>
            <div class="message__user-comment">
              <p>
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
  }
  $('#new_message').on('submit', function(e) {

    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax( {
      url: url,
      type: "POST",
      data: formData,
      datatype: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});
import $ from 'jquery';
import path from 'path';

var failure_message = (callback, context, file_path) => error => {
  var message = error.responseText || error;
  callback(`could not find "${file_path}" in "${context}": ${message}`);
};

export default {

  // NOTE: get does not paginate, so if there are a lot of files
  // with the same basename, it will only return the file if 
  // it is in the first 10 results
  //
  // ALSO NOTE: If the file is not found, a warning is produced 
  // on the console and the callback is never called, but no 
  // error is thrown
  get: (context, file_path) => {
    var dirname = path.dirname(file_path);
    var filename = path.basename(file_path);

    return new Promise((resolve, reject) => {
      var fail = failure_message(reject, context, file_path);
      
      // get the folder for this file's parent
      var folder = $.getJSON(`/api/v1/${context}/folders/by_path/${dirname}`);

      folder.fail(fail).done(folders => {
        // by_path always returns all folders in the path 
        // ending with the target
        var folder_id = folders[folders.length-1].id;

        var file_listing = $.getJSON(`/api/v1/${context}/files`, { 
          'only[]': 'names', 
          search_term: filename 
        })
        
        file_listing.fail(fail).done(files => {
          var file = files.find(file => file.folder_id == folder_id);

          if (file) {
            var public_url_request = $.getJSON(`/api/v1/files/${file.id}/public_url`);
            
            public_url_request.fail(fail).done(public_url => {
              $.get(public_url['public_url']).fail(fail).done(resolve);
            });
          } else {
            fail('search returned empty array');
          }
        });
      })
    });
  },

  // Canvas has an involved upload workflow: 
  // https://canvas.instructure.com/doc/api/file.file_uploads.html
  put: (context, file_path, data) => {
    var url = `/api/v1/${context}/files`;

    var params = { 
      name: path.basename(file_path), 
      content_type: 'text/plain',
      on_duplicate: 'overwrite',
      parent_folder_path: path.dirname(file_path)
    }

    return new Promise((resolve, reject) => {
      var fail = failure_message(reject, context, file_path);    

      $.post(url, params).fail(fail).done(token => {
        var form = new FormData();

        for (var param in token.upload_params) {
          form.append(param, token.upload_params[param]);
        }

        form.append("file", new Blob([data], {type: "text/plain"}));

        $.ajax({
          type: 'POST',
          data: form,
          failure: fail,
          processData: false,
          contentType: false,
          url: token.upload_url,
          success: resolve
        });
      });
    });
  }
}
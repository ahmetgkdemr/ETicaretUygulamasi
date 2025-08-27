using ETicaretAPI.Application.Services;
using ETicaretAPI.Infrastructure;
using ETicaretAPI.Infrastructure.Operations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Infrastructure.Services
{
    public class FileService : IFileService
    {
        readonly IWebHostEnvironment _webHostEnvironment;
        public FileService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment=webHostEnvironment;
        }

        public async Task<bool> CopyFileAsync(string path, IFormFile file)
        {
            try
            {
                await using FileStream fileStream = new(path, FileMode.Create, FileAccess.Write, FileShare.None, 1024 * 1024, useAsync: false);
                await file.CopyToAsync(fileStream);
                await fileStream.FlushAsync();
                return true;
            }
            catch (Exception ex)
            {
                //todo log!  (task listten görülebilir)
                throw ex;
            }
        }

        async Task<string> FileRenameAsync(string path, string fileName)  //private oldu bu
        {
            string newFileName = await Task.Run<string>(async () =>
            {
                string extension = Path.GetExtension(fileName);
                string onlyFileName = Path.GetFileNameWithoutExtension(fileName);
                string newFileName = NameOperation.CharacterRegulatory(onlyFileName) + extension;

                int fileCounter = 1;
                while (File.Exists(Path.Combine(path, newFileName)))
                {
                    fileCounter++;
                    newFileName = onlyFileName + "-" + fileCounter + extension;

                    if (fileCounter == int.MaxValue)
                    {
                        break;
                    }
                }
                return newFileName;
            });
            return newFileName;
        }

        public async Task<List<(string fileName, string path)>> UploadAsync(string path, IFormFileCollection files)
        {
            string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, path);

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }
            List<bool> resaults = new();
            List < (string fileName, string path) > datas= new ();
            
            foreach(IFormFile file in files)
            {
                string fileNewName= await FileRenameAsync(uploadPath,file.FileName);
                bool result= await CopyFileAsync($"{uploadPath}\\{fileNewName}",file);
                datas.Add((fileNewName, $"{path}\\{fileNewName}"));
                resaults.Add(result);
            }

            if (resaults.TrueForAll(r => r.Equals(true)))
            {
                return datas;
            }
            return null;
            //todo eğer ki yukaridaki if bloğu geçerli değilse burada dosyaların sunucuda yüklenirken hata alındığına dair bir exception oluşturulup fırlatması gerekiyor.
        }
    }
}

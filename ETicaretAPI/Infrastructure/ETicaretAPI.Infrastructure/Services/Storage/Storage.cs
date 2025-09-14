using ETicaretAPI.Infrastructure.Operations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Infrastructure.Services.Storage
{
    public class Storage
    {
        protected delegate bool HasFile(string pathOrContainer, string fileName);
        protected async Task<string> FileRenameAsync(string pathOrContainerName, string fileName, HasFile hasFileMethod)  //private oldu bu
        {
            string newFileName = await Task.Run<string>(async () =>
            {
                string extension = Path.GetExtension(fileName);
                string onlyFileName = Path.GetFileNameWithoutExtension(fileName);
                string newFileName = NameOperation.CharacterRegulatory(onlyFileName) + extension;

                int fileCounter = 1;

            //File.Exists(Path.Combine(path, newFileName)) while içinde bu vardı
            while (hasFileMethod(pathOrContainerName, newFileName))
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

    }
}

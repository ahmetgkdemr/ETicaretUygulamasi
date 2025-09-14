using ETicaretAPI.Infrastructure.Operations;

namespace ETicaretAPI.Infrastructure.Services
{
    public class FileService 
    {
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

        
    }
}

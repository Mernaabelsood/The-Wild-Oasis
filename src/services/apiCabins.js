import supabase, { supabaseUrl } from "./superbase";

export async function getCabins() {
    const { data, error } = await supabase
      .from('cabins')
      .select('*')
if (error) {
      console.error(error);
      throw new Error('Cabins could not be loaded');
    }
return data;
}

export async function createCabin(newCabin) {

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  //https://iddflntaamppoqpkcvcc.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  //1.create cabin 

  const { data, error } = await supabase
  .from('cabins')
  .insert([{...newCabin, image: imagePath}])
  



  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  //2.upload image 

const { error: storageError } = await supabase.storage
.from('cabin-images')
.upload(imageName, newCabin.image);
if (storageError) {
  console.error(storageError);
  throw new Error('Cabin image could not be uploaded');
}

return data;

}

export async function deleteCabin(id) {

  const { data, error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
return data;

}
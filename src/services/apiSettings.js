import supabase from "./supabase"; // Ensure this is correctly set up

export async function getSettings() {
  try {
    const { data, error } = await supabase.from("settings").select("*").single();

    if (error) {
      console.error("Error fetching settings:", error);
      throw new Error("Settings could not be loaded");
    }

    console.log("Fetched settings:", data);
    return data;
  } catch (err) {
    console.error("Unexpected error in getSettings:", err);
    throw err;
  }
}

// We expect a newSetting object that looks like { setting: newValue }
export async function updateSetting(newSetting) {
  try {
    const { data, error } = await supabase
      .from("settings")
      .update(newSetting)
      .eq("id", 1) // Ensure there's an actual row with id=1
      .select()
      .single();

    if (error) {
      console.error("Error updating settings:", error);
      throw new Error("Settings could not be updated");
    }

    console.log("Updated setting:", data);
    return data;
  } catch (err) {
    console.error("Unexpected error in updateSetting:", err);
    throw err;
  }
}

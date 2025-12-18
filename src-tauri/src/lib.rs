use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Game {
    pub id: String,
    pub title: String,
    pub remarks: Option<String>,
    pub price: Option<String>,
    pub custom_fields: Option<serde_json::Value>,
}

pub struct AppState {
    games: Mutex<Vec<Game>>,
    data_file: PathBuf,
}

impl AppState {
    fn new(data_file: PathBuf) -> Self {
        let games = Self::load_games(&data_file);
        AppState {
            games: Mutex::new(games),
            data_file,
        }
    }

    fn load_games(path: &PathBuf) -> Vec<Game> {
        if path.exists() {
            if let Ok(content) = fs::read_to_string(path) {
                if let Ok(games) = serde_json::from_str(&content) {
                    return games;
                }
            }
        }
        Vec::new()
    }

    fn save_games(&self) -> Result<(), String> {
        let games = self.games.lock().unwrap();
        let content = serde_json::to_string_pretty(&*games)
            .map_err(|e| format!("Failed to serialize games: {}", e))?;
        fs::write(&self.data_file, content)
            .map_err(|e| format!("Failed to write games file: {}", e))?;
        Ok(())
    }
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn register_game(
    state: tauri::State<AppState>,
    title: String,
    remarks: Option<String>,
    price: Option<String>,
    custom_fields: Option<serde_json::Value>,
) -> Result<Game, String> {
    if title.trim().is_empty() {
        return Err("Title is required".to_string());
    }

    let game = Game {
        id: uuid::Uuid::new_v4().to_string(),
        title,
        remarks,
        price,
        custom_fields,
    };

    let mut games = state.games.lock().unwrap();
    games.push(game.clone());
    drop(games);

    state.save_games()?;
    Ok(game)
}

#[tauri::command]
fn search_games(state: tauri::State<AppState>, query: String) -> Vec<Game> {
    let games = state.games.lock().unwrap();
    let query_lower = query.to_lowercase();
    
    if query.trim().is_empty() {
        return Vec::new();
    }

    games
        .iter()
        .filter(|game| {
            game.title.to_lowercase().contains(&query_lower)
                || game.remarks.as_ref().map_or(false, |r| r.to_lowercase().contains(&query_lower))
        })
        .cloned()
        .collect()
}

#[tauri::command]
fn get_all_games(state: tauri::State<AppState>) -> Vec<Game> {
    let games = state.games.lock().unwrap();
    games.clone()
}

#[tauri::command]
fn update_game(
    state: tauri::State<AppState>,
    id: String,
    title: String,
    remarks: Option<String>,
    price: Option<String>,
    custom_fields: Option<serde_json::Value>,
) -> Result<Game, String> {
    if title.trim().is_empty() {
        return Err("Title is required".to_string());
    }

    let mut games = state.games.lock().unwrap();
    
    if let Some(game) = games.iter_mut().find(|g| g.id == id) {
        game.title = title;
        game.remarks = remarks;
        game.price = price;
        game.custom_fields = custom_fields;
        let updated_game = game.clone();
        drop(games);
        
        state.save_games()?;
        Ok(updated_game)
    } else {
        Err("Game not found".to_string())
    }
}

#[tauri::command]
fn delete_game(state: tauri::State<AppState>, id: String) -> Result<(), String> {
    let mut games = state.games.lock().unwrap();
    let initial_len = games.len();
    games.retain(|g| g.id != id);
    
    if games.len() == initial_len {
        return Err("Game not found".to_string());
    }
    
    drop(games);
    state.save_games()?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let data_dir = dirs::data_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join("plusy-gamedex");
    
    fs::create_dir_all(&data_dir).expect("Failed to create data directory");
    let data_file = data_dir.join("games.json");
    
    let app_state = AppState::new(data_file);

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            greet,
            register_game,
            search_games,
            get_all_games,
            update_game,
            delete_game
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

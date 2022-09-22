

use::{
    node_bindgen::{
        derive::node_bindgen,
        core::{
            val::JsEnv,
            NjError
        }
    },
    std::{
        time::{
            SystemTime,
            UNIX_EPOCH
        },
        io::Write,
        fs::File,
        ptr
    }
};





static mut FILENAME: String = String::new();
fn fset(name: String) { unsafe { FILENAME = name; } }
fn fget() -> &'static String { unsafe { &FILENAME } }


/// initialize env hook up
#[node_bindgen]
fn init(env: JsEnv) -> Result<(), NjError> { unsafe {
    env.add_env_clean_up_hook(Some(cleanup), ptr::null_mut())?;
    Ok(())
}}

struct CoreLog {}
#[node_bindgen]
impl CoreLog {
    /// Contructor
    #[node_bindgen(constructor)]
    fn new() -> Self {
        fset(format!("CORELOG-{}.log",time()));
        match File::create(fget()) {
            Ok(mut v) => {
                v.write_all(b"----------CORE LOG----------\n").unwrap();
            },
            Err(_) => {
                println!("CORELOG ERROR: Unable to create log file");
            }
        };
        Self {}
    }

    /// Logs to file
    #[node_bindgen]
    fn log(&self, data: String){
        match File::open(fget()) {
            Ok(mut f) => {
                let _ = f.write(format!("{}\n",data).as_bytes()).unwrap();
            },
            Err(_) => {
                println!("CORELOG ERROR: Unable to open log file");
            }
        };
    }
}

unsafe extern "C" fn cleanup(_arg: *mut ::std::os::raw::c_void) {
    match File::open(fget()) {
        Ok(mut f) => {
            let _ = f.write(b"----------   END  ----------").unwrap();
        },
        Err(_) => {}
    };
}

fn time() -> u128 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_millis()
}
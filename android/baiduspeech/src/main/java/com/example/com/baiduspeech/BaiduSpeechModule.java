package com.example.com.baiduspeech;

import com.baidu.tts.client.SpeechError;
import com.baidu.tts.client.SpeechSynthesizer;
import com.baidu.tts.client.SpeechSynthesizerListener;
import com.baidu.tts.client.TtsMode;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BaiduSpeechModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME="BaiduSpeech";
    private ReactApplicationContext context;
    private SpeechSynthesizer speechSynthesizer=null;

    public BaiduSpeechModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context=reactContext;
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }
    @ReactMethod
    public void init(String appId,String apiKey,String secretKey){
        if(speechSynthesizer!=null){
            return;
        }
        speechSynthesizer=SpeechSynthesizer.getInstance();
        speechSynthesizer.setContext(this.context);
        speechSynthesizer.setSpeechSynthesizerListener(new SpeechSynthesizerListener() {
            @Override
            public void onSynthesizeStart(String s) {

            }

            @Override
            public void onSynthesizeDataArrived(String s, byte[] bytes, int i) {

            }

            @Override
            public void onSynthesizeFinish(String s) {

            }

            @Override
            public void onSpeechStart(String s) {

            }

            @Override
            public void onSpeechProgressChanged(String s, int i) {

            }

            @Override
            public void onSpeechFinish(String s) {

            }

            @Override
            public void onError(String s, SpeechError speechError) {

            }
        });
        speechSynthesizer.setAppId(appId);
        speechSynthesizer.setApiKey(apiKey,secretKey);
        speechSynthesizer.auth(TtsMode.MIX);
        speechSynthesizer.setParam(SpeechSynthesizer.PARAM_SPEAKER, "5");
        speechSynthesizer.initTts(TtsMode.MIX);

    }
    @ReactMethod
    public void speak(String text){
        speechSynthesizer.speak(text);

    }
    @ReactMethod
    public void release(){
        if(speechSynthesizer!=null){
            speechSynthesizer.release();
        }
    }
    @ReactMethod
    public void pause(){
        if(speechSynthesizer!=null){
            speechSynthesizer.pause();
        }
    }
    @ReactMethod
    public void resume(){
        if(speechSynthesizer!=null){
            speechSynthesizer.resume();
        }
    }
}

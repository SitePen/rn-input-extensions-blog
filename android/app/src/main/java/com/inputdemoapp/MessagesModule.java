package com.inputdemoapp;

import android.content.ClipDescription;
import android.net.Uri;
import android.os.Build;
import android.view.inputmethod.InputConnection;
import android.view.inputmethod.InputContentInfo;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.content.FileProvider;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;

public class MessagesModule extends ReactContextBaseJavaModule {
    final ReactApplicationContext context;
    final InputService service;

    private static final String AUTHORITY = "com.inputdemoapp.fileprovider";

    MessagesModule(ReactApplicationContext context, InputService service) {
        super(context);
        this.context = context;
        this.service = service;
    }

    @Override
    @NonNull
    public String getName() {
        return "MessagesModule";
    }

    @RequiresApi(api = Build.VERSION_CODES.N_MR1)
    @ReactMethod
    public void insertSticker(String stickerUri, Promise promise) {
        final Uri sUri = Uri.parse(stickerUri);
        File stickerFile;

        if (sUri.getScheme().equals("file")) {
            stickerFile = new File(sUri.getPath());
        } else {
            try (
                BufferedInputStream in =
                    new BufferedInputStream(new URL(sUri.toString()).openStream());
                FileOutputStream out =
                    context.openFileOutput("temp.png", 0)
            ) {
                final byte buffer[] = new byte[2048];
                int bytesRead = 0;
                while ((bytesRead = in.read(buffer, 0, buffer.length)) != -1) {
                    out.write(buffer, 0, bytesRead);
                }
            } catch (IOException e) {
               promise.reject(e);
               return;
            }

            stickerFile = context.getFileStreamPath("temp.png");
        }

        final Uri uri = FileProvider.getUriForFile(
			service,
			AUTHORITY,
			stickerFile
		);

        service.getCurrentInputConnection().commitContent(
			new InputContentInfo(
                uri,
                new ClipDescription("Sticker", new String[]{"image/png"})
            ),
            InputConnection.INPUT_CONTENT_GRANT_READ_URI_PERMISSION,
            null
        );
        promise.resolve(null);
    }
}

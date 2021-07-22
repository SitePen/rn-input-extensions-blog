package com.inputdemoapp;

import android.content.Context;
import android.inputmethodservice.InputMethodService;
import android.view.View;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;

import com.facebook.react.PackageList;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.soloader.SoLoader;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class InputService extends InputMethodService {
    private ReactInstanceManager reactInstanceManager;

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, false);
        reactInstanceManager = createReactInstanceManager();
    }

    @Override
    public View onCreateInputView() {
		// This custom layout container constrains the height of the RN view to
		// 250 points
        final MaxHeightLinearLayout container =
            new MaxHeightLinearLayout(this, 250);

        ReactRootView reactView = new ReactRootView(this);
        reactView.startReactApplication(reactInstanceManager,
            "InputDemoStickersApp",
            null
        );

        container.addView(reactView);
        return container;
    }

    private ReactInstanceManager createReactInstanceManager() {
        List<ReactPackage> packages =
            new PackageList(getApplication()).getPackages();
        packages.add(new MessagesModulePackage(this));

        return ReactInstanceManager
            .builder()
            .setApplication(getApplication())
            .addPackages(packages)
            .setUseDeveloperSupport(BuildConfig.DEBUG)
            .setInitialLifecycleState(LifecycleState.BEFORE_CREATE)
            .setJSMainModulePath("index")
            .setBundleAssetName("index.android.bundle")
            .build();
    }
}

class MaxHeightLinearLayout extends LinearLayout {
    private int maxHeight = 250;

    public MaxHeightLinearLayout(Context context) {
        super(context);
        setMaxHeight(250);
    }

    public MaxHeightLinearLayout(Context context, int maxHeight) {
        super(context);
        setMaxHeight(maxHeight);
    }

    public void setMaxHeight(int maxHeight) {
        this.maxHeight =
            (int)(maxHeight * getContext().getResources().getDisplayMetrics().density);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        heightMeasureSpec = MeasureSpec.makeMeasureSpec(maxHeight,
            MeasureSpec.AT_MOST);
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }
}

class MessagesModulePackage implements ReactPackage {
    final InputService service;

    public MessagesModulePackage(InputService service) {
        super();
        this.service = service;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new MessagesModule(reactContext, service));
        return modules;
    }
}

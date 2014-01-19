//
//  AppDelegate.h
//  PokrovskySobor
//
//  Created by GoloVaZa on 10.09.13.
//  Copyright (c) 2013 pbsputnik. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Stack.h"
#import "PhotoGalleryController.h"
#import "GalleryController.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate,
    UIGestureRecognizerDelegate, UIWebViewDelegate, UIScrollViewDelegate>
{
    BOOL menuIsInFront;
    NSArray *menuButtons;
    Stack *history;
    
    UILongPressGestureRecognizer *longPressRecognizer;
    //UIButton *mainMenuView;
    UIWebView *mainMenuView;
    UIWebView *webView;
    PhotoGalleryController *photoGalleryController;
    GalleryController *galleryController;
}

@property (strong, nonatomic) UIWindow *window;
@property (nonatomic, retain) UILongPressGestureRecognizer *longPressRecognizer;
//@property (nonatomic, retain) UIButton *mainMenuView;
@property (nonatomic, retain) UIWebView *mainMenuView;
@property (nonatomic, retain) UIWebView *webView;
@property (nonatomic, retain) PhotoGalleryController *photoGalleryController;
@property (nonatomic, retain) GalleryController *galleryController;

//- (void)longPressDetected:(UIGestureRecognizer *)sender;
- (void)openPage:(NSString *)pageName;
- (void)openPhoto:(NSString *)galleryName;

@end

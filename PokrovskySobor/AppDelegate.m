//
//  AppDelegate.m
//  PokrovskySobor
//
//  Created by GoloVaZa on 10.09.13.
//  Copyright (c) 2013 pbsputnik. All rights reserved.
//

#import "AppDelegate.h"
#import "CCircleButton.h"
#import "RootViewController.h"
#import "Stack.h"

@implementation AppDelegate

@synthesize longPressRecognizer, mainMenuView, webView;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    // Override point for customization after application launch.
    self.window.backgroundColor = [UIColor whiteColor];

    RootViewController *rootController = [RootViewController new];
    self.window.rootViewController = rootController;
    [self.window.rootViewController prefersStatusBarHidden];

    // initializing long press recognition
    longPressRecognizer = [[UILongPressGestureRecognizer alloc]
     initWithTarget:self
     action:@selector(longPressDetected:)];
    longPressRecognizer.minimumPressDuration = 0.5;
    longPressRecognizer.numberOfTouchesRequired = 1;
    longPressRecognizer.cancelsTouchesInView = YES;
    longPressRecognizer.delegate = self;
    [self.window addGestureRecognizer:longPressRecognizer];

    /*
    //store menu buttons as circles in array
    CCircleButton *photo, *pan, *useful, *temples, *history, *bonus, *about, *guide;
    photo = [[CCircleButton alloc] initWithCenter:CGPointMake(260.0, 180.0) radius:67.0 link:@"photo"];
    pan = [[CCircleButton alloc] initWithCenter:CGPointMake(522.0, 180.0) radius:67.0 link:@"pan"];
    useful = [[CCircleButton alloc] initWithCenter:CGPointMake(390.0, 311.0) radius:87.5 link:@"useful"];
    temples = [[CCircleButton alloc] initWithCenter:CGPointMake(260.0, 442.0) radius:87.5 link:@"temples_list"];
    history = [[CCircleButton alloc] initWithCenter:CGPointMake(522.0, 442.0) radius:87.5 link:@"history"];
    bonus = [[CCircleButton alloc] initWithCenter:CGPointMake(128.0, 574.0) radius:67.0 link:@"bonus"];
    about = [[CCircleButton alloc] initWithCenter:CGPointMake(390.0, 574.0) radius:87.5 link:@"about"];
    guide = [[CCircleButton alloc] initWithCenter:CGPointMake(522.0, 705.0) radius:67.0 link:@"guide"];
    menuButtons = [NSArray arrayWithObjects:photo, pan, useful, temples, history, bonus, about, guide, nil]; */
    
/*    mainMenuView = [[UIButton alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    [mainMenuView setImage:[UIImage imageWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"menu" ofType:@"png" inDirectory:@"www/images"]] forState:UIControlStateNormal];
    mainMenuView.adjustsImageWhenHighlighted = NO;
    mainMenuView.contentMode = UIViewContentModeScaleAspectFill;
    mainMenuView.backgroundColor = [UIColor whiteColor];
    
    [mainMenuView addTarget:self action:@selector(menuTouchUp:withEvent:) forControlEvents:UIControlEventTouchUpInside];*/
    
    mainMenuView = [[UIWebView alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    mainMenuView.delegate = self;
    NSURL *url = [NSURL fileURLWithPath:
                  [[NSBundle mainBundle] pathForResource:@"contents" ofType:@"html" inDirectory:@"www"]];
    [mainMenuView loadRequest:[NSURLRequest requestWithURL:url]];
    
    mainMenuView.scalesPageToFit = YES;
    mainMenuView.scrollView.scrollEnabled = NO;
    mainMenuView.scrollView.bounces = NO;

    [self.window makeKeyAndVisible];
    
    webView = [[UIWebView alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    webView.delegate = self;
    url = [NSURL fileURLWithPath:
                  [[NSBundle mainBundle] pathForResource:@"contents" ofType:@"html" inDirectory:@"www"]];
    [webView loadRequest:[NSURLRequest
                          requestWithURL:[NSURL URLWithString:[url.absoluteString stringByAppendingString:@"?first=1"]]]];
    
    webView.scalesPageToFit = YES;
    webView.scrollView.delegate = self;
    webView.scrollView.scrollEnabled = NO;
    webView.scrollView.bounces = NO;
    [self.window.rootViewController.view addSubview:webView];
    menuIsInFront = YES;
    history = [[Stack alloc] initWithObject:@"first"];
    
    return YES;
}

// we need to override this method to make webView pass gestures to window 
-(BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer
{
    return YES;
}

- (void)longPressDetected:(UIGestureRecognizer *)sender
{
    if (menuIsInFront)
    {
        return;
    }
    
    if (sender.state != UIGestureRecognizerStateBegan) {
        return;
    }
        
    [UIView transitionWithView:self.window.rootViewController.view duration:0.3
                       options:UIViewAnimationOptionTransitionCrossDissolve
                    animations:^ {
                        [webView removeFromSuperview];
                    }
                    completion: ^(BOOL finished)
                    {
                        menuIsInFront = YES;
                        [self.webView loadHTMLString:@"" baseURL:nil];
                        [UIView transitionWithView:self.window.rootViewController.view duration:0.3
                                           options:UIViewAnimationOptionTransitionCrossDissolve
                                        animations:^ {
                                            [self.window.rootViewController.view addSubview:mainMenuView];
                                        }
                                        completion: nil];
                    }];
    [history push:@"contents"];
}

- (void)hideMenu
{
    [UIView transitionWithView:self.window.rootViewController.view duration:0.3
                       options:UIViewAnimationOptionTransitionCrossDissolve
                    animations:^ {
                        [mainMenuView removeFromSuperview];
                    }
                    completion:^(BOOL finished){
                        [UIView transitionWithView:self.window.rootViewController.view duration:0.3
                                           options:UIViewAnimationOptionTransitionCrossDissolve
                                        animations:^ {
                                            [self.window.rootViewController.view addSubview:self.webView];
                                        }
                                        completion: nil];
                    }];
    
}

- (void)openPage:(NSString *)pageName
{
    if (menuIsInFront) {
        [self hideMenu];
    }
    
    NSURL *url;
    
    if ([pageName isEqual:@"first"])
    {
        url = [NSURL fileURLWithPath:
               [[NSBundle mainBundle] pathForResource:@"contents" ofType:@"html" inDirectory:@"www"]];
        [webView loadRequest:[NSURLRequest
                              requestWithURL:[NSURL URLWithString:[url.absoluteString stringByAppendingString:@"?first=1"]]]];
    }
    else
    {
        url = [NSURL fileURLWithPath:
               [[NSBundle mainBundle] pathForResource:pageName ofType:@"html" inDirectory:@"www"]];
        [webView loadRequest:[NSURLRequest requestWithURL:url]];
        if (![pageName isEqual:@"contents"]) menuIsInFront = NO;
    }
    [history push:pageName];
}

- (void)openPano:(NSString *)sceneName
{
    if (menuIsInFront) {
        [self hideMenu];
    }
    
    NSString *query;
    if (sceneName) query = [@"?startscene=" stringByAppendingString:sceneName];
    else query = @"";
    
    NSURL *url = [NSURL fileURLWithPath:
                  [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"www/vtour"]];
    NSURL *res = [NSURL URLWithString:[url.absoluteString stringByAppendingString:query]];
    [webView loadRequest:[NSURLRequest requestWithURL:res]];
    menuIsInFront = NO;
    [history push:[@"pan:" stringByAppendingString:sceneName]];
}


-(BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request
    navigationType:(UIWebViewNavigationType)navigationType
{
    NSURL *url = request.URL;
    NSString *command = url.scheme;
    NSString *operand = [url.path substringFromIndex:1];
    
    if ([command isEqual:@"scroll"])
    {
        if ([operand isEqual:@"down"])
        {
            [self.webView.scrollView scrollRectToVisible:CGRectMake(0, 1024, 768, 1024) animated:YES];
        }
        else if ([operand isEqual:@"up"])
        {
            [self.webView.scrollView scrollRectToVisible:CGRectMake(0, 0, 768, 1024) animated:YES];
        }
        
        return NO;
    }
    else if ([command isEqual:@"open"])
    {
        if (operand.length >= 1)
        {
            [self openPage:operand];
        }
        return NO;
    }
    else if ([command isEqual:@"pan"])
    {
        if (operand.length >= 1)
        {
            [self openPano:operand];
        }
        return NO;
    }
    else if ([command isEqual:@"back"])
    {
        NSString *destination = [history pop]; //current page
        destination = [history pop]; //previous page
        
        if ([destination rangeOfString:@"pan:"].location == NSNotFound)
        {
            [self openPage:destination];
        }
        else
        {
            [self openPano:[destination substringFromIndex:4]];
        }
        return NO;
    }

    
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application
{
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end

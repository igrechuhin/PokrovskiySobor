//
//  GalleryController.m
//  PokrovskySobor
//
//  Created by GoloVaZa on 19.01.14.
//  Copyright (c) 2014 pbsputnik. All rights reserved.
//

#import "GalleryController.h"
#import "AppDelegate.h"

@interface GalleryController ()

@end

@implementation GalleryController

@synthesize closeButton;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Добавляем кнопку для закрытия
        UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
        button.frame = CGRectMake(698.0, 30.0, 40.0, 40.0);
        [button setImage:[UIImage imageNamed:@"close_dark.png"] forState:UIControlStateNormal];
        [button addTarget:(id)self action:@selector(closeButtonPressed) forControlEvents:UIControlEventTouchUpInside];
        self.closeButton = button;
        [self.view addSubview:self.closeButton];

    }
    return self;
}

-(void)closeButtonPressed
{
    [self.view removeFromSuperview];
}
- (IBAction)openVasilii:(id)sender
{
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [appDelegate openPhoto:@"vasilii"];
}
- (IBAction)openPokrova:(id)sender {
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [appDelegate openPhoto:@"pokrova"];
}
- (IBAction)openKipriana:(id)sender {
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [appDelegate openPhoto:@"kipriana"];
}
- (IBAction)openJerusalem:(id)sender {
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [appDelegate openPhoto:@"jerusalem"];
}
- (IBAction)openTroitsa:(id)sender {
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [appDelegate openPhoto:@"troitsa"];
}
- (IBAction)openPatriarhi:(id)sender {
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [appDelegate openPhoto:@"patriarhi"];
}
- (IBAction)openNikola:(id)sender {
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [appDelegate openPhoto:@"nikola"];
}
- (IBAction)openGrigory:(id)sender {
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [appDelegate openPhoto:@"grigory"];
}
- (IBAction)openSvirski:(id)sender {
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [appDelegate openPhoto:@"svirski"];
}
- (IBAction)openVarlaam:(id)sender {
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [appDelegate openPhoto:@"varlaam"];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end

//
//  GalleryController.h
//  PokrovskySobor
//
//  Created by GoloVaZa on 19.01.14.
//  Copyright (c) 2014 pbsputnik. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface GalleryController : UIViewController
{
    UIButton *_closeButton;
}
@property (strong, nonatomic) IBOutlet UIButton *btnVasilii;
@property (strong, nonatomic) IBOutlet UIButton *btnPokrova;
@property (strong, nonatomic) IBOutlet UIButton *btnKipriana;
@property (strong, nonatomic) IBOutlet UIButton *btnJerusalem;
@property (strong, nonatomic) IBOutlet UIButton *btnTroitsa;
@property (strong, nonatomic) IBOutlet UIButton *btnPatriarhi;
@property (strong, nonatomic) IBOutlet UIButton *btnNikola;
@property (strong, nonatomic) IBOutlet UIButton *btnGrigory;
@property (strong, nonatomic) IBOutlet UIButton *btnSvirski;
@property (strong, nonatomic) IBOutlet UIButton *btnVarlaam;

@property (nonatomic, retain) UIButton *closeButton;

@end

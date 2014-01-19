//
//  PhotoGalleryController.h
//  PokrovskySobor
//
//  Created by GoloVaZa on 06.01.14.
//  Copyright (c) 2014 pbsputnik. All rights reserved.
//

#import "NIToolbarPhotoViewController.h"

@interface PhotoGalleryController : NIToolbarPhotoViewController<
                                    NIPhotoAlbumScrollViewDataSource,
                                    NIPhotoScrubberViewDataSource>
{
@private
    NSString* _galleryName;
    UIButton *_closeButton;
    NSMutableArray *_images;
    
    BOOL _isLoaded;
    NSInteger _photosNumber;
}

- (id)initWithGalleryName:(NSString*)galleryName;

@property (nonatomic, readwrite, copy) NSString* galleryName;
@property (nonatomic, retain) UIButton *closeButton;



@end

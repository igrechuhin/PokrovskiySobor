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
    
    BOOL _isLoaded;
}

- (id)initWithGalleryName:(NSString*)galleryName;

@property (nonatomic, readwrite, copy) NSString* galleryName;


@end

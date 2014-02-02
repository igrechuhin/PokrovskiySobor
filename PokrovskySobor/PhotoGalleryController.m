//
//  PhotoGalleryController.m
//  PokrovskySobor
//
//  Created by GoloVaZa on 06.01.14.
//  Copyright (c) 2014 pbsputnik. All rights reserved.
//

#import "PhotoGalleryController.h"
#import "CaptionedPhotoView.h"
#import "NIPhotoScrollView.h"

@interface PhotoGalleryController ()

@end

@implementation PhotoGalleryController

@synthesize galleryName = _galleryName, closeButton;

- (id)initWithGalleryName:(NSString *)galleryName {
    if ((self = [self initWithNibName:nil bundle:nil])) {
        self.galleryName = galleryName;
        _isLoaded = NO;
        _isTouched = NO;
        
        // Добавляем кнопку для закрытия
        UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
        button.frame = CGRectMake(698.0, 30.0, 40.0, 40.0);
        [button setImage:[UIImage imageNamed:@"close.png"] forState:UIControlStateNormal];
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

/*- (void)loadView {
    [super loadView];*/
- (void)viewDidLoad {
        [super viewDidLoad];
    if (!_isLoaded)
    {
        NSString *dir = @"www/images/gallery/";
        _photosNumber = [[[NSBundle mainBundle] pathsForResourcesOfType:@"jpg" inDirectory:[dir stringByAppendingString:_galleryName]] count];
        
        _images = [[NSMutableArray alloc] init];
        for (unsigned i = 0; i < _photosNumber; i++) {
            [_images addObject:[NSNull null]];
        }
        
        self.photoAlbumView.dataSource = self;
        self.photoScrubberView.dataSource = self;

        [self.photoAlbumView reloadData];
        [self.photoScrubberView reloadData];
        
        _isLoaded = YES;
    }
}

- (void)viewDidUnload {
    _isLoaded = NO;
    _images = nil;
    
    [super viewDidUnload];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSInteger)numberOfPhotosInScrubberView:(NIPhotoScrubberView *)photoScrubberView
{
    return _photosNumber;
}

- (UIImage *)photoScrubberView: (NIPhotoScrubberView *)photoScrubberView
              thumbnailAtIndex: (NSInteger)thumbnailIndex
{
    NSBundle *mainBundle = [NSBundle mainBundle];
    NSString *file = [NSString stringWithFormat:@"%d", thumbnailIndex+1];
    NSString *dir = @"www/images/gallery/";
    UIImage *image = [UIImage imageWithContentsOfFile:[mainBundle pathForResource:file ofType:@"jpg" inDirectory:[[dir stringByAppendingString:_galleryName] stringByAppendingString:@"/thumbs"]]];
    
    return image;
}

- (NSInteger)numberOfPagesInPagingScrollView:(NIPhotoAlbumScrollView *)photoScrollView
{
    return _photosNumber;
}

- (void)decompressImage: (UIImage*)inImage atIndex:(NSInteger)photoIndex
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
            UIImage *image = inImage;
            UIGraphicsBeginImageContextWithOptions(image.size, YES, 0);
            [image drawAtPoint:CGPointZero];
            image = UIGraphicsGetImageFromCurrentImageContext();
            UIGraphicsEndImageContext();
            
            dispatch_async(dispatch_get_main_queue(), ^{
                [self.photoAlbumView didLoadPhoto: image
                                          atIndex: photoIndex
                                        photoSize: NIPhotoScrollViewPhotoSizeOriginal];
            });
    });

}

- (UIImage *)photoAlbumScrollView: (NIPhotoAlbumScrollView *)photoAlbumScrollView
                     photoAtIndex: (NSInteger)photoIndex
                        photoSize: (NIPhotoScrollViewPhotoSize *)photoSize
                        isLoading: (BOOL *)isLoading
          originalPhotoDimensions: (CGSize *)originalPhotoDimensions {
    UIImage *image = [_images objectAtIndex:photoIndex];
    
    NSBundle *mainBundle = [NSBundle mainBundle];
    NSString *bfile = [NSString stringWithFormat:@"%db", photoIndex+1];
    NSString *file = [NSString stringWithFormat:@"%d", photoIndex+1];
    NSString *dir = @"www/images/gallery/";
    UIImage *bigImage = [UIImage imageWithContentsOfFile:[mainBundle pathForResource:file ofType:@"jpg" inDirectory:[dir stringByAppendingString:_galleryName]]];
    if (!_isTouched) [self decompressImage:bigImage atIndex:photoIndex];

    if ((NSNull *)image != [NSNull null])
    {
        *photoSize = NIPhotoScrollViewPhotoSizeThumbnail;
        *originalPhotoDimensions = [bigImage size];
        *isLoading = YES;
    }
    else
    {
        image = [UIImage imageWithContentsOfFile:[mainBundle pathForResource:bfile ofType:@"jpg" inDirectory:[[dir stringByAppendingString:_galleryName] stringByAppendingString:@"/thumbs"]]];
        *photoSize = NIPhotoScrollViewPhotoSizeThumbnail;
        *originalPhotoDimensions = [bigImage size];
        *isLoading = YES;
        
        [_images replaceObjectAtIndex:photoIndex withObject:image];
    }
    //NSLog(@"get photo at index: %d", photoIndex);
    return [_images objectAtIndex:photoIndex];
    //return image;
}

/*
- (id<NIPagingScrollViewPage>)pagingScrollView:(NIPagingScrollView *)pagingScrollView pageViewForIndex:(NSInteger)pageIndex {
    return [self.photoAlbumView pagingScrollView:pagingScrollView pageViewForIndex:pageIndex];
}*/

- (void)setChromeVisibility:(BOOL)isVisible animated:(BOOL)animated
{
    [super setChromeVisibility:isVisible animated:animated];
    
    if (isVisible)
    {
        closeButton.hidden = NO;
    }
    else closeButton.hidden = YES;
    
}

- (UIView<NIPagingScrollViewPage>*)pagingScrollView:(NIPagingScrollView *)pagingScrollView pageViewForIndex:(NSInteger)pageIndex {
    UIView<NIPagingScrollViewPage>* pageView = nil;
    NSString* reuseIdentifier = NSStringFromClass([CaptionedPhotoView class]);
    pageView = [pagingScrollView dequeueReusablePageWithIdentifier:reuseIdentifier];
    if (nil == pageView) {
        pageView = [[CaptionedPhotoView alloc] init];
        pageView.reuseIdentifier = reuseIdentifier;
    }
    
    NIPhotoScrollView* photoScrollView = (NIPhotoScrollView *)pageView;
    photoScrollView.photoScrollViewDelegate = self.photoAlbumView;
    photoScrollView.zoomingAboveOriginalSizeIsEnabled = [self.photoAlbumView isZoomingAboveOriginalSizeEnabled];
    
    NSString *file = [NSString stringWithFormat:@"%d", pageIndex+1];
    NSString *dir = @"www/images/gallery/";
    NSString *path = [[NSBundle mainBundle] pathForResource:file ofType:@"txt" inDirectory:[[dir stringByAppendingString:_galleryName] stringByAppendingString:@"/captions"]];
    NSString *caption = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:NULL];
    
    CaptionedPhotoView* captionedView = (CaptionedPhotoView *)pageView;
    captionedView.caption = caption;
    
    return pageView;
}

- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event
{
    _isTouched = YES;
}

- (void)touchesEnded:(NSSet *)touches withEvent:(UIEvent *)event
{
    _isTouched = NO;
    for (NIPhotoScrollView* page in self.photoAlbumView.visiblePages)
    {
        NSInteger photoIndex = page.pageIndex;
        NSBundle *mainBundle = [NSBundle mainBundle];
        NSString *file = [NSString stringWithFormat:@"%d", photoIndex+1];
        NSString *dir = @"www/images/gallery/";
        UIImage *bigImage = [UIImage imageWithContentsOfFile:[mainBundle pathForResource:file ofType:@"jpg" inDirectory:[dir stringByAppendingString:_galleryName]]];
        [self decompressImage:bigImage atIndex:photoIndex];
    }
}


@end

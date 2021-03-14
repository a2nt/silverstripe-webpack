<?php


namespace App\Tasks;

use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\LabelAlignment;
use Endroid\QrCode\QrCode;
use SilverStripe\Assets\File;
use SilverStripe\Assets\Image;
use SilverStripe\Assets\Storage\AssetStore;
use SilverStripe\Assets\Upload;
use SilverStripe\Control\Director;
use SilverStripe\Core\Injector\Injector;


class QRCodeTask extends BuildTask
{
    protected $title = 'Generate website QR-code';

    protected $description = 'Generate website QR-code';

    protected $enabled = true;

    public function run($request)
    {
        echo '<h1>'.$this->Title().'</h1>';

        echo self::generateQR();

        die('Done!');
    }

    public static function generateQR()
    {
        $qrCode = new QrCode(Director::absoluteBaseURL());
        $qrCode->setSize(600);
        $qrCode->setMargin(10);

        $qrCode->setWriterByName('png');
        $qrCode->setEncoding('UTF-8');
        $qrCode->setErrorCorrectionLevel(ErrorCorrectionLevel::HIGH());
        $qrCode->setForegroundColor(['r' => 0, 'g' => 0, 'b' => 0, 'a' => 0]);
        $qrCode->setBackgroundColor(['r' => 255, 'g' => 255, 'b' => 255, 'a' => 0]);
        $qrCode->setLabel(Director::absoluteBaseURL(), 16, null, LabelAlignment::CENTER());
        /*$qrCode->setLogoPath('/'.File::join_paths(
            PUBLIC_PATH,
            RESOURCES_DIR,
            project(),
            'client', 'dist', 'icons',
            'apple-touch-icon-152x152.png'
        ));
        $qrCode->setLogoSize(152, 152);*/
        $qrCode->setValidateResult(true);


        // Round block sizes to improve readability and make the blocks sharper in pixel based outputs (like png).
        // There are three approaches:
        $qrCode->setRoundBlockSize(true, QrCode::ROUND_BLOCK_SIZE_MODE_MARGIN); // The size of the qr code is shrinked, if necessary, but the size of the final image remains unchanged due to additional margin being added (default)
        $qrCode->setRoundBlockSize(true, QrCode::ROUND_BLOCK_SIZE_MODE_ENLARGE); // The size of the qr code and the final image is enlarged, if necessary
        $qrCode->setRoundBlockSize(true, QrCode::ROUND_BLOCK_SIZE_MODE_SHRINK); // The size of the qr code and the final image is shrinked, if necessary

        // Set additional writer options (SvgWriter example)
        $qrCode->setWriterOptions(['exclude_xml_declaration' => true]);

        // Directly output the QR code
        /*header('Content-Type: '.$qrCode->getContentType());
        echo $qrCode->writeString();
        die();*/

        // Save it to a file
        $qrCode->writeFile(TEMP_PATH.'/qrcode.png');
        $res = self::getAssetStore()->setFromLocalFile(
            TEMP_PATH.'/qrcode.png',
            'qrcode.png', null, null,
            [
                'conflict' => AssetStore::CONFLICT_OVERWRITE,
                'visibility' => AssetStore::VISIBILITY_PUBLIC,
            ]
        );

        $img = Image::get()->filter([
            'ParentID' => 0,
            'FileFilename' => $res['Filename'],
        ])->first();
        if(!$img) {
            $img = Image::create();
        }

        $res['FileHash'] = $res['Hash'];
        $res['FileFilename'] = $res['Filename'];
        $res['ParentID'] = 0;

        $img = $img->update($res);
        $img->write();
        $img->publishFile();

        return '<img src="'.$qrCode->writeDataUri().'" width="300" alt="QR-code" /><br/>';
    }

    protected static function getAssetStore()
    {
        return Injector::inst()->get(AssetStore::class);
    }
}

<?php


namespace App\Tasks;


use SilverStripe\Control\HTTPRequest;

class BuildTask extends \SilverStripe\Dev\BuildTask
{

    protected $title = 'Base build task interface';
    protected $description = 'Base build task interface';
    protected $enabled = false;

    protected $messages = [];
    /**
     * Implement this method in the task subclass to
     * execute via the TaskRunner
     *
     * @param HTTPRequest $request
     * @return
     */
    public function run($request)
    {
        // TODO: Implement run() method.
        return $this->render();
    }

    public function Title()
    {
        return $this->title;
    }

    protected function setMessage($msg, string $type = 'msg')
    {
        if(is_array($msg)) {
            $type = 'list';
        }

        $this->messages[] = [$type, $msg];
    }

    public function render()
    {
        echo '<style>'
            .'.info{color:#053bff}'
            .'.bad,.error{color:red}'
            .'.good,.success{color:green}'
            .'</style>';

        foreach ($this->messages as $item) {
            $type = $item[0];
            $msg = $item[1];

            switch ($type) {
                case 'h2':
                    echo '<h2>'.$msg.'</h2>'.PHP_EOL;
                    break;
                case 'h3':
                    echo '<h3>'.$msg.'</h3>'.PHP_EOL;
                    break;
                case 'list':
                    echo '<ul>';
                    foreach ($msg as $m) {
                        echo '<li>'.$m.'</li>';
                    }
                    echo '</ul>';
                    break;
                default:
                    echo $msg.'<br/>'.PHP_EOL;
                    break;
            }
        }

        echo '<h2 class="success">Success!</h2>';
    }
}

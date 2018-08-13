<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" >
        <title><%t SilverShop\ShopEmail.AdminNotificationTitle "Shop Receipt" %></title>
        <% include SilverShop\Includes\OrderReceiptStyle %>
    </head>
    <body>
        <table id="container" cellpadding="0" cellspacing="0" border="0" >
            <tr>
                <td>
                    <table id="Content" cellspacing="0" cellpadding="0" summary="Email Information">
                        <thead>
                            <tr>
                                <th scope="col" colspan="2">
                                    <h1 class="title">$Subject</h1>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <% if $Order %>
                                <% loop $Order %>
                                    <tr>
                                        <td>
                                            <% include SilverShop\Model\Order %>
                                        </td>
                                    </tr>
                                <% end_loop %>
                            <% end_if %>
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>

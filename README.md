# MMM-Billigbrus

The MMM-Billigbrus module is a MagicMirror² module designed to display the lowest priced Coca-Cola product from the Kassal.app API.

![Screenshot](screenshot.png)

## Installation

1. Navigate to your MagicMirror's `modules` directory.
2. Clone this repository:
   ```sh
   git clone https://github.com/ItsMeBrille/MMM-Billigbrus.git
   ```

## Configuration

To use this module, add it to the modules array in the `config/config.js` file of your MagicMirror:

```javascript
{
  module: "MMM-Billigbrus",
  position: "top_right",
  config: {
    updateInterval: 12, // update interval in hours
    ean: "5000112637380", // Product EAN number
    apiKey: "YOUR_API_KEY_HERE", // Your API key from Kassal.app
  }
}
```

### Configuration Options

| Option          | Description                                  |
| --------------- | -------------------------------------------- |
| `updateInterval`| Interval to update the product information    |
| `ean`           | EAN number for Coca-Cola                     |
| `apiKey`        | Your API key from Kassal.app                 |

## Dependencies

- [kassal.app](https://kassal.app/) - Kassal.app API for product and price information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
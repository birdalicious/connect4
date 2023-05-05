using Connect4;
using NUnit.Framework;

namespace Connect4Test
{
   [TestFixture]
    public class Connect4Tests
    {
        private IConnect4 GetGame()
        {
            return new Connect4.Connect4();
        }

        [Test]
        public void Play_ValidMove_ReturnsTrue()
        {
            // Arrange
            var game = GetGame();
            var column = 0;

            // Act
            var result = game.Play(column);

            // Assert
            Assert.IsTrue(result);
        }

        [Test]
        public void Play_InvalidMove_ReturnsFalse()
        {
            // Arrange
            var game = GetGame();
            var column = -1;

            // Act
            var result = game.Play(column);

            // Assert
            Assert.IsFalse(result);
        }

        [Test]
        public void Play_FullColumn_ReturnsFalse()
        {
            // Arrange
            var game = GetGame();
            var column = 0;
            game.Play(column);
            game.Play(column);
            game.Play(column);
            game.Play(column);
            game.Play(column);
            game.Play(column);

            // Act
            var result = game.Play(column);

            // Assert
            Assert.IsFalse(result);
        }

        [Test]
        public void HasWon_NoWin_ReturnsNull()
        {
            // Arrange
            var game = GetGame();
            game.Play(0);
            game.Play(1);
            game.Play(0);
            game.Play(1);
            game.Play(0);
            game.Play(1);
            game.Play(2);
            game.Play(2);
            game.Play(2);
            game.Play(3);

            // Act
            var result = game.Winner;

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public void HasWon_ColumnWin_ReturnsWinner()
        {
            // Arrange
            //|   |   |   |   |   |   |   |
            //|   |   |   |   |   |   |   |
            //| 0 |   |   |   |   |   |   |
            //| 0 | 1 |   |   |   |   |   |
            //| 0 | 1 |   |   |   |   |   |
            //| 0 | 1 |   |   |   |   |   |
            var game = GetGame();
            game.Play(0);
            game.Play(1);
            game.Play(0);
            game.Play(1);
            game.Play(0);
            game.Play(1);
            game.Play(0);

            // Act
            var result = game.Winner;

            // Assert
            Assert.IsTrue(result == 0);
        }

        [Test]
        public void HasWon_RowWin_ReturnsWinner()
        {
            // Arrange
            //|   |   |   |   |   |   |   |
            //|   |   |   |   |   |   |   |
            //|   |   |   |   |   |   |   |
            //|   |   |   |   |   |   |   |
            //| 1 | 1 |   | 1 |   |   |   |
            //| 0 | 0 | 0 | 0 |   |   |   |
            var game = GetGame();
            game.Play(0);
            game.Play(0);
            game.Play(1);
            game.Play(1);
            game.Play(3);
            game.Play(3);
            game.Play(2);

            // Act
            var result = game.Winner;

            // Assert
            Assert.IsTrue(result == 0);
        }

        [Test]
        public void HasWon_DiagonalBottomLeftTopRightWin_ReturnsWinner()
        {
            // Arrange
            //|   |   |   |   |   |   |   |
            //|   |   |   |   |   |   |   |
            //|   |   |   | 0 |   |   |   |
            //|   |   | 0 | 1 |   |   |   |
            //|   | 0 | 0 | 0 |   |   |   |
            //| 0 | 1 | 1 | 1 |   | 1 |   |
            var game = GetGame();
            game.Play(0);
            game.Play(1);
            game.Play(1);
            game.Play(2);
            game.Play(2);
            game.Play(3);
            game.Play(3);
            game.Play(3);
            game.Play(3);
            game.Play(5);
            game.Play(2);

            // Act
            var result = game.Winner;

            // Assert
            Assert.IsTrue(result == 0);
        }

        [Test]
        public void HasWon_DiagonalBottomRightTopLeftWin_ReturnsWinner()
        {
            // Arrange
            //| 0 |   |   |   |   |   |   |
            //| 0 |   |   |   |   |   |   |
            //| 1 |   |   |   |   |   |   |
            //| 0 | 1 |   |   |   |   |   |
            //| 1 | 1 | 1 |   |   |   |   |
            //| 0 | 0 | 0 | 1 |   |   |   |
            var game = GetGame();
            game.Play(0);
            game.Play(0);
            game.Play(0);
            game.Play(0);
            game.Play(1);
            game.Play(1);
            game.Play(2);
            game.Play(2);
            game.Play(0);
            game.Play(3);
            game.Play(0);
            game.Play(1);

            // Act
            var result = game.Winner;

            // Assert
            Assert.IsTrue(result == 1);
        }
    }
}
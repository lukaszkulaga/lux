CREATE TABLE [dbo].[zgloszeniaWykonawca](
    [IdZgloszeniaWykonawca] [int] IDENTITY(1,1) NOT NULL,
    [IdUzytkownika] [int] NULL,
    [IdZgloszenia] [int] NULL,
    PRIMARY KEY CLUSTERED
(
[IdZgloszeniaWykonawca] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
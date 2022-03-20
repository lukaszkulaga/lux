USE [lukinia]
GO

/****** Object:  Table [dbo].[daneUzytkownika]    Script Date: 29.10.2021 15:24:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[daneUzytkownika](
    [IdUzytkownika] [int] IDENTITY(1,1) NOT NULL,
    [Rola] [int]  NULL,
    [Imie] [nvarchar](255) NULL,
    [Nazwisko] [nvarchar](255) NULL,
    [NazwaUzytkownika] [nvarchar](255) NULL,
    [Email] [nvarchar](255) NULL,
    [NumerTelefonu] [nvarchar](255) NULL,
    [Haslo] [nvarchar](255) NULL,
    [StatusKonta] [int]  NULL,
    [Zdjecie] [nvarchar](max) NULL,
    [DataModyfikacji] [datetime2](7) NULL,
    [User] [nvarchar](255) NULL
    PRIMARY KEY CLUSTERED
(
[IdUzytkownika] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
    GO



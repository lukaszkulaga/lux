USE [lukinia]
GO

/****** Object:  Table [dbo].[slownikRola]    Script Date: 15.02.2022 18:07:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[slownikRola](
    [IdRola] [int] IDENTITY(1,1) NOT NULL,
    [Opis] [nvarchar](255) NULL,
    PRIMARY KEY CLUSTERED
(
[IdRola] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    GO


    insert into slownikRola (Opis) values ('Administrator');
insert into slownikRola (Opis) values ('Użytkownik');

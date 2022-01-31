CREATE TABLE [dbo].[zgloszeniaZalaczniki](
    [IdZalacznik] [int] IDENTITY(1,1) NOT NULL,
    [Sciezka] [nvarchar](255) NULL,
    [IdZgloszenia] [int] NULL,
    PRIMARY KEY CLUSTERED
(
[IdZalacznik] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    GO